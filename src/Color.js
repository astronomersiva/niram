import React, { Component } from 'react';
import styled from 'react-emotion';

const Block = styled('div')`
  display: inline-block;
  height: 15vw;
  width: 15vw;
  border: 3px solid transparent;
  transition: border 0.2s;

  background-color: ${(props) => {
    const { color = [0, 0, 0] } = props;
    return `rgb(${color.join(',')})`;
  }};

  &:hover {
    border: 3px solid white;
  }
`;

class Color extends Component {
  handleHover = () => {
    const { color, changeTitleColor } = this.props;
    changeTitleColor(color);
  };

  render() {
    return <Block color={this.props.color} onMouseOver={this.handleHover} />;
  }
}

export default Color;
