import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { css } from 'react-emotion';

const hexCodeStyle = css`
  height: 12vh;
  font-size: 8vh;
  padding: 5vh;
`;

class ColorCode extends Component {
  rgbToHex = rgb => {
    const hexArray = rgb.map(component => {
      const base16 = component.toString(16);
      return base16.length === 1 ? `0${base16}` : base16;
    });

    return `#${hexArray.join('')}`;
  };

  render() {
    const { activeColor } = this.props;

    return (
      <div className={hexCodeStyle}>
        {activeColor.length ? this.rgbToHex(activeColor) : ''}
      </div>
    );
  }
}

export default hot(module)(ColorCode);
