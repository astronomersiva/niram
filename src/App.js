import React, { Component } from 'react';
import styled, { css } from 'react-emotion';
import getPixels from 'get-pixels';
import palette from 'get-rgba-palette';

import Color from './Color';
import lena from './images/lena.png';

const Container = styled('div')`
  background: #111;
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 52px;
  color: ${(props) => {
    const { color = [142, 142, 142] } = props;
    return `rgb(${color.join(',')})`;
  }};
  text-shadow: ${(props) => {
    const { color = [142, 142, 142] } = props;
    return `0px 0px 7px rgb(${color.join(',')})`;
  }};
  transition: color 0.2s;
`;

const colorBlocksStyle = css`
  margin-top: 150px;
`;

class App extends Component {
  state = {
    colors: [],
    activeColor: []
  };

  getColors = () => {
    getPixels(lena, (err, pixels) => {
      if (err) {
        console.log(`Errored - ${err}`);
        return;
      }

      const colors = palette(pixels.data);
      this.setState({ colors });
    });
  };

  changeTitleColor = (color) => {
    this.setState({ activeColor: color });
  };

  render() {
    const { colors } = this.state;
    const colorBlocks = colors.map((color) => {
      return <Color key={color} color={color} changeTitleColor={this.changeTitleColor} />;
    });

    return (
      <div>
        <Container onClick={this.getColors} color={this.state.activeColor}>niram</Container>
        <div className={colorBlocksStyle}>{colorBlocks}</div>
      </div>
    );
  }
}

export default App;
