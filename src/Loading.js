import React, { Component } from 'react';
import { css } from 'react-emotion';
import { hot } from 'react-hot-loader';

const LoadingStyle = css`
  font-size: 6vh;
  color: rgb(142, 142, 142);
`;

class Loading extends Component {
  render() {
    return <div className={LoadingStyle}>Extracting Colors</div>;
  }
}

export default hot(module)(Loading);
