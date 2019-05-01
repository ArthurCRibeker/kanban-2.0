import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PomodoroPopOut from './PomodoroPopOut';
import Pomodoro from './Pomodoro';
import pomodoroAlert from './pomodoroAlert';

class PomodoroWrapper extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
    pomodoro: PropTypes.shape({
      audio: PropTypes.bool,
      notification: PropTypes.bool,
      pomodori: PropTypes.number,
      showDayPomo: PropTypes.bool
    }).isRequired
  };

  constructor(props) {
    super(props);
    const { pomodoro } = props;
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const pomodoriDone = pomodoro.pomodoriDone && pomodoro.pomodoriDone[date];

    this.state = {
      sessionLength: 25,
      timeInterval: 0,
      pausedTime: 0,
      timePaused: false,
      timePassedMs: 0,
      endTime: 0,
      pomodoriDone: pomodoriDone || 0,
      pomodori: pomodoro.pomodori || 0,
      opened: false
    };
  }

  componentDidMount() {
    Notification.requestPermission();
    window.addEventListener('beforeunload', () => this.toggleOpened(false));
  }

  componentWillUnmount() {
    const { timeInterval } = this.state;

    clearInterval(timeInterval);
    window.removeEventListener('beforeunload', this.toggleOpened);
  }

  getFormatTypes = () => [
    { type: 'Work', sessionLength: 25 },
    { type: 'Coffee', sessionLength: 5 }
  ];

  formatType = timeType =>
    this.getFormatTypes().filter(
      timeObj => timeObj.sessionLength === timeType
    )[0].type;

  startCountdown = () => {
    const { timeInterval, timePaused, pausedTime } = this.state;
    // Pause pomodoro if countdown is currently running, otherwise start
    // countdown

    if (timeInterval !== 0) {
      this.pauseCountdown();
    } else {
      // Set start and end time with system time and convert to
      // milliseconds to correctly measure time elapsed
      const newStartTime = new Date().getTime();
      // Check if pomodoro has just been un-paused
      if (timePaused === false) {
        // First time starting pomodoro
        this.unPauseCountdown();
      } else {
        // At first pause and every pause afterwards
        this.setState({
          endTime: newStartTime + pausedTime,
          timePaused: false
        });
      }
      // Run updateCountdown every 990ms to avoid lag with 1000ms,
      // Update countdown checks time against system time and updates
      // #countdown display
      this.setState({
        timeInterval: setInterval(this.updateCountdown, 990)
      });
    }
  };

  updateCountdown = () => {
    const { endTime } = this.state;

    // Get difference between the current time and the
    // end time in milliseconds. difference = remaining time
    const difference = endTime - new Date().getTime();

    // Display remaining minutes and seconds, unless there is less than 1 second
    // left on timer. Then change to next session.
    if (difference > 1000) {
      this.setState({
        timePassedMs: difference
      });
    } else {
      this.changeSessions();
    }
  };

  resetInterval = () => {
    const { timeInterval } = this.state;

    clearInterval(timeInterval);
    this.setState({
      timeInterval: 0
    });
  };

  changeSessions = () => {
    const { sessionLength, pomodoriDone } = this.state;

    this.resetInterval();

    // Notification
    const {
      pomodoro: { audio, notification }
    } = this.props;
    pomodoroAlert(sessionLength, audio, notification);

    if (sessionLength === 25) {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

      const pomodoriDoneObject = {
        [date]: pomodoriDone + 1
      };

      this.handleSettingsChange('pomodoriDone', pomodoriDoneObject);

      this.setState({
        sessionLength: 5,
        pomodoriDone: pomodoriDone + 1,
        timePassedMs: 0
      });
    } else {
      this.setState({
        sessionLength: 25,
        timePassedMs: 0
      });
    }
  };

  pauseCountdown = () => {
    const { endTime } = this.state;

    this.resetInterval();
    this.setState({
      pausedTime: endTime - new Date().getTime(),
      timePaused: true
    });
  };

  unPauseCountdown = () => {
    const { sessionLength } = this.state;

    this.setState({
      endTime: new Date().getTime() + sessionLength * 60000
    });
  };

  handleSettingsChange = (type, value) => {
    const { dispatch, boardId } = this.props;

    dispatch({
      type: 'CHANGE_POMODORO_SETTING',
      payload: { boardId, type, value }
    });
  };

  toggleOpened = bool => {
    this.setState({ opened: bool });

    // this.setState(prevState => ({ opened: !prevState.opened }));
  };

  handlePomodoriChange = e => {
    this.setState({
      pomodori: parseInt(e.target.value, 10)
    });
  };

  stopCountdown = newTime => {
    this.resetInterval();
    this.setState({
      sessionLength: newTime,
      pausedTime: 0,
      timePaused: false,
      endTime: 0,
      timePassedMs: 0
    });
  };

  render() {
    const {
      timeInterval,
      pomodoriDone,
      sessionLength,
      timePaused,
      pomodori,
      timePassedMs,
      opened
    } = this.state;
    const { pomodoro } = this.props;

    return (
      <div>
        {opened && (
          <PomodoroPopOut toggleOpened={this.toggleOpened}>
            <Pomodoro
              pomodoro={pomodoro}
              timeInterval={timeInterval}
              pomodoriDone={pomodoriDone}
              sessionLength={sessionLength}
              timePaused={timePaused}
              pomodori={pomodori}
              timePassedMs={timePassedMs}
              stopCountdown={this.stopCountdown}
              handleSettingsChange={this.handleSettingsChange}
              startCountdown={this.startCountdown}
              handlePomodoriChange={this.handlePomodoriChange}
              formatType={this.formatType}
              toggleOpened={this.toggleOpened}
              opened={opened}
            />
          </PomodoroPopOut>
        )}
        <Pomodoro
          pomodoro={pomodoro}
          timeInterval={timeInterval}
          pomodoriDone={pomodoriDone}
          sessionLength={sessionLength}
          timePaused={timePaused}
          pomodori={pomodori}
          timePassedMs={timePassedMs}
          stopCountdown={this.stopCountdown}
          handleSettingsChange={this.handleSettingsChange}
          startCountdown={this.startCountdown}
          handlePomodoriChange={this.handlePomodoriChange}
          formatType={this.formatType}
          toggleOpened={this.toggleOpened}
          opened={opened}
        />
      </div>
    );
  }
}

export default PomodoroWrapper;
