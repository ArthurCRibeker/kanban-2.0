import styled from "styled-components";

const HeaderButtonStyles = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 10px 8px 10px;
  border-radius: 3px;
  color: ${props => props.theme.colors.white};
  transition: background 0.1s;
  cursor: pointer;
	background: transparent;

  &:hover,
  &:focus {
    background: ${props => props.theme.colors.transparentBlack};
  }
`;

export default HeaderButtonStyles;
