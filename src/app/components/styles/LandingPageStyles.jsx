import styled from "styled-components";

const LandingPageStyles = styled.div`
  height: 100%;
  width: 100%;
  color: white;

  .landing-page-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #300;
  }

  .landing-page-background img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    object-position: 50% 100%;
  }

  /* wrapper added as a hack to make background */
  .landing-page-info-wrapper {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
  }

  .landing-page-info {
    padding: 100px 30px;
    z-index: 5;
  }

  .landing-page-heading {
    display: flex;
    align-items: center;

    h1 {
      font-size: 30px;
    }
  }

  .landing-page-logo {
    height: 55px;
  }

  .landing-page-description {
    margin: 10px 0;
    font-size: 18px;
    font-weight: 700;

    a {
      color: white;
    }
  }

  .signin-buttons {
    display: flex;
    justify-content: space-between;
    width: 650px;
  }

  .signin-button {
    display: inline-flex;
    flex-shrink: 1;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 210px;
    height: 40px;
    margin-top: 10px;
    border: 0;
    border-radius: 3px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }

  .google-button {
    background: white;
    color: ${props => props.theme.colors.text};
  }

  .google-button:hover,
  .google-button:focus {
    background: #ddd;
  }

  .logo-icon {
    font-size: 30px;
  }

  .google-logo {
    height: 30px;
  }

  .guest-button-wrapper {
    position: relative;
  }

  .guest-button {
    background: white;
    color: ${props => props.theme.colors.text};
  }

  .guest-button:hover,
  .guest-button:focus {
    background: #ddd;
  }

  @media (max-width: 800px) {
    .landing-page-info-wrapper {
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.6);
    }

    .landing-page-info {
      padding: 10px;
      justify-content: center;
    }

    .landing-page-heading {
      justify-content: center;
    }

    .landing-page-description {
      text-align: center;
    }

    .signin-buttons {
      flex-direction: column;
      align-items: center;
      width: auto;
    }

    .signin-button {
      width: 320px;
    }
  }

  @media (max-width: 440px) {
    .signin-button {
      width: 240px;
    }
  }

  @media (max-height: 350px) {
    .landing-page-heading h1 {
      margin: 10px 0;
    }
  }
`;

export default LandingPageStyles;
