import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import Checkbox from '../Atoms/Checkbox';

const StyledSlider = styled.div`
  --thumb: 12px;
  --track: 3px;

  width: 100%;
  display: flex;
  align-items: center;

  > *:not(:last-child) {
    margin-right: 6px;
  }

  .checkbox {
    cursor: pointer;
  }

  .number {
    color: ${props =>
      props.isChecked
        ? props.theme.colors.textSecondary
        : transparentize(0.2, props.theme.colors.textSecondary)};
    font-family: Pacifico;
    margin-top: -5px;
  }

  input[type='range'] {
    padding: 0;
    width: 100%;
    height: var(--thumb);
    background: transparent;
    margin-top: 3px;

    &,
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &::-webkit-slider-runnable-track {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: var(--track);
      background: ${props => props.theme.colors.elevated};
    }

    &::-webkit-slider-runnable-track {
      background: ${props =>
        `linear-gradient(${
          props.isChecked
            ? transparentize(0.3, props.theme.colors.secondary)
            : props.theme.colors.textDisabled
        }, ${
          props.isChecked
            ? transparentize(0.3, props.theme.colors.secondary)
            : props.theme.colors.textDisabled
        }) 0/calc(0.5*var(--thumb) + ${
          props.ratio
        }*(100% - var(--thumb))) 100% no-repeat ${
          props.theme.colors.elevated
        }`};
    }

    &::-moz-range-track {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: var(--track);
      background: ${props => props.theme.colors.elevated};
    }

    &::-ms-track {
      box-sizing: border-box;
      border: none;
      width: 100%;
      height: var(--track);
      background: ${props => props.theme.colors.elevated};
    }

    &::-moz-range-progress {
      height: var(--track);
      background: ${props =>
        props.isChecked
          ? transparentize(0.3, props.theme.colors.secondary)
          : props.theme.colors.textDisabled};
    }

    &::-moz-focus-outer {
      border: 0;
    }

    &::-ms-fill-lower {
      height: var(--track);
      background: ${props =>
        props.isChecked
          ? transparentize(0.3, props.theme.colors.secondary)
          : props.theme.colors.textDisabled};
    }

    &::-webkit-slider-thumb {
      box-sizing: border-box;
      border: none;
      width: var(--thumb);
      height: var(--thumb);
      border-radius: 50%;
      background: ${props =>
        props.isChecked
          ? props.theme.colors.secondaryDark
          : props.theme.colors.text};
      cursor: pointer;
      transform: translate(0, -45%);
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        box-shadow 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;

      &:hover {
        box-shadow: ${props =>
          `0px 0px 0px 6px ${transparentize(
            0.9,
            props.theme.colors.secondaryDark
          )}`};
      }

      &:active {
        box-shadow: ${props =>
          `0px 0px 0px 9px ${transparentize(
            0.8,
            props.theme.colors.secondaryDark
          )}`};
      }
    }

    &::-moz-range-thumb {
      box-sizing: border-box;
      border: none;
      width: var(--thumb);
      height: var(--thumb);
      border-radius: 50%;
      background: ${props =>
        props.isChecked
          ? props.theme.colors.secondaryDark
          : props.theme.colors.text};
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        box-shadow 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;

      &:hover {
        box-shadow: ${props =>
          `0px 0px 0px 6px ${transparentize(
            0.9,
            props.theme.colors.secondaryDark
          )}`};
      }

      &:active {
        box-shadow: ${props =>
          `0px 0px 0px 9px ${transparentize(
            0.8,
            props.theme.colors.secondaryDark
          )}`};
      }
    }

    &::-ms-thumb {
      margin-top: 0;
      box-sizing: border-box;
      border: none;
      width: var(--thumb);
      height: var(--thumb);
      border-radius: 50%;
      background: ${props =>
        props.isChecked
          ? props.theme.colors.secondaryDark
          : props.theme.colors.text};
      cursor: pointer;
      transform: translate(0, -40%);
      transition: transform 150ms cubic-bezier(0, 0, 0.2, 1) 0ms,
        box-shadow 150ms cubic-bezier(0, 0, 0.2, 1) 0ms;

      &:hover {
        box-shadow: ${props =>
          `0px 0px 0px 6px ${transparentize(
            0.9,
            props.theme.colors.secondaryDark
          )}`};
      }

      &:active {
        box-shadow: ${props =>
          `0px 0px 0px 9px ${transparentize(
            0.8,
            props.theme.colors.secondaryDark
          )}`};
      }
    }

    &::-ms-tooltip {
      display: none;
    }
  }
`;

const Slider = ({ value, onCheckClick, onDragEnd, checkValue, className }) => {
  const [sliderValue, setSliderValue] = useState(value);
  const [isChecked, setIsChecked] = useState(checkValue);

  const min = 0;
  const max = 10;
  const range = max - min;
  const ratio = (sliderValue - min) / range;

  const toggleCheck = () => {
    onCheckClick(!isChecked);
    setIsChecked(!isChecked);
  };

  const handleOnChange = e => {
    setSliderValue(e.target.value);
  };

  const handleOnDragEnd = () => {
    onDragEnd(sliderValue);
  };

  return (
    <StyledSlider
      sliderValue={sliderValue}
      ratio={ratio}
      isChecked={isChecked}
      className={className}
    >
      <Checkbox
        onChange={toggleCheck}
        checked={isChecked}
        name="sliderCheckbox"
        color="secondary"
      />
      <input
        name="slider"
        onChange={handleOnChange}
        onMouseUp={handleOnDragEnd}
        value={sliderValue}
        type="range"
        max={max}
        min={min}
        step="1"
      />
      <span className="number">{sliderValue}</span>
    </StyledSlider>
  );
};

Slider.defaultProps = { value: 0 };

Slider.propTypes = {
  value: PropTypes.number,
  onCheckClick: PropTypes.func,
  onDragEnd: PropTypes.func,
  checkValue: PropTypes.bool,
  className: PropTypes.string
};

export default Slider;
