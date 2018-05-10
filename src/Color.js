import React, { Component } from 'react';
import styled from 'react-emotion';

const Block = styled('div')`
  display: inline-block;
  height: 200px;
  width: 200px;
  border: 3px solid transparent;
  background-color: ${(props) => {
    const { color = [0, 0, 0] } = props;
    return `rgb(${color.join(',')})`;
  }};
  transition: border 0.2s;

  &:hover {
    border: 3px solid white;
  }
`;

class Color extends Component {
  render() {
    return <Block color={this.props.color}/>;
  }
}

export default Color;
