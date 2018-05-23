import React, { Component } from 'react';
import styled from 'react-emotion';
import { hot } from 'react-hot-loader';

const Nav = styled('div')`
  background: #111;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8vh;
  transition: color 0.2s;
  color: ${props => {
    const { color = [142, 142, 142] } = props;
    return `rgb(${color.join(',')})`;
  }};
  text-shadow: ${props => {
    const { color = [142, 142, 142] } = props;
    return `0px 0px 7px rgb(${color.join(',')})`;
  }};
`;

const SourceLink = styled('span')`
  position: absolute;
  right: 5vw;
  font-size: 2vh;
  color: #484848;
  text-shadow: none;
  cursor: pointer;
`;

class Header extends Component {
  render() {
    return (
      <Nav color={this.props.activeColor}>
        niram
        <SourceLink
          onClick={() =>
            window.open('https://github.com/astronomersiva/niram', '_blank')
          }
        >
          &lt; &#47;&gt;
        </SourceLink>
      </Nav>
    );
  }
}

export default hot(module)(Header);
