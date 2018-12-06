import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Title } from "react-head";
import { FiUser } from "react-icons/fi";
import googleLogo from "../../../assets/images/google-logo.svg";
import background1920 from "../../../assets/images/postits-1920.jpg";
import background1366 from "../../../assets/images/postits-1366.jpg";
import LandingPageStyles from "../styles/LandingPageStyles";

class LandingPage extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  enterAsGuest = () => {
    const { dispatch } = this.props;
    dispatch({ type: "ENTER_AS_GUEST" });
  };

  render = () => (
    <LandingPageStyles>
      <Title>Sign in | React Kanban</Title>
      <div className="landing-page-background">
        <img
          srcSet={`${background1920} 1920w, ${background1366} 1366w`}
          src={background1920}
          alt="background"
        />
      </div>
      <div className="landing-page-info-wrapper">
        <div className="landing-page-info">
          <div className="landing-page-heading">
            <h1>React Kanban</h1>
          </div>
          <p className="landing-page-description">
            An open source kanban application inspired by Trello. Check out the
            source code on{" "}
            <a
              href="https://github.com/amelieoller/kanban-2.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <div className="signin-buttons">
            <div>
              <a href="/auth/google" className="signin-button google-button">
                <img
                  className="google-logo"
                  src={googleLogo}
                  alt="google logo"
                />
                &nbsp;Sign in with Google
              </a>
            </div>
            <div className="guest-button-wrapper">
              <button
                type="submit"
                onClick={this.enterAsGuest}
                className="signin-button guest-button"
              >
								<FiUser className="logo-icon" /> &nbsp;Enter as guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </LandingPageStyles>
  );
}

export default connect()(LandingPage);
