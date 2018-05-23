import React, { Component } from 'react';
import { css } from 'react-emotion';
import { hot } from 'react-hot-loader';
const InputStyle = css`
  display: none;
`;

class FileInput extends Component {
  render() {
    return (
      <input
        type="text"
        className={InputStyle}
        onChange={this.props.applyMimeTypes}
      />
    );
  }
}

export default hot(module)(FileInput);
