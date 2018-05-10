import React, { Fragment, Component } from 'react';
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
`;

const colorBlocks = css`
  margin-top: 150px;
`;

class App extends Component {
  state = {
    colors: []
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

  render() {
    const { colors } = this.state;
    return (
      <Fragment>
        <Container onClick={this.getColors}>niram</Container>
        <div className={colorBlocks}>
          {
            colors.map((color) => {
              return <Color key={color} color={color} />
            })
          }
        </div>
      </Fragment>
    );
  }
}

export default App;
