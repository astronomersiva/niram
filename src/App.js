import React, { Component } from 'react';

// file upload
import Dropzone from 'react-dropzone'

// image processing related
import getPixels from 'get-pixels';
import palette from 'get-rgba-palette';

// css in js :P
import styled, { css } from 'react-emotion';

// components
import Color from './Color';

// css in js :P
const Header = styled('div')`
  background: #111;
  text-align: center;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8vh;
  transition: color 0.2s;
  color: ${(props) => {
    const { color = [142, 142, 142] } = props;
    return `rgb(${color.join(',')})`;
  }};
  text-shadow: ${(props) => {
    const { color = [142, 142, 142] } = props;
    return `0px 0px 7px rgb(${color.join(',')})`;
  }};
`;

const colorBlocksStyle = css`
  padding: 6vw 0;
  min-height: 60vh;
`;

const hexCodeStyle = css`
  height: 12vh;
  font-size: 8vh;
  padding: 5vh;
`;

const DropzoneStyle = css`
  position: relative;
`;

const InputStyle = css`
  display: none;
`;

const DropHereStyle = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 6em 0;
  text-align: center;
  color: rgb(142, 142, 142);
  font-size: 6vh;
`;

const OverlayStyle = css`
  ${DropHereStyle};
  background: rgba(0, 0, 0, 0.5);
`;

class App extends Component {
  state = {
    colors: [],
    activeColor: [],
    isEmpty: true,
    accept: 'image/jpeg, image/png',
    files: [],
    dropzoneActive: false
  };

  onDragEnter = () => {
    this.setState({ isEmpty: false, dropzoneActive: true });
  };

  onDragLeave = () => {
    this.setState({ isEmpty: true, dropzoneActive: false });
  };

  onDrop = (files) => {
    this.setState({
      files,
      dropzoneActive: false
    });

    files.forEach((file) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileContent = reader.result;
        this.getColors(fileContent);
      };

      reader.onabort = () => this.setState({ isEmpty: true });
      reader.onerror = () => this.setState({ isEmpty: true });
    });
  };

  applyMimeTypes = (event) => {
    this.setState({ accept: event.target.value });
  };

  getColors = (image) => {
    return getPixels(image, (err, pixels) => {
      if (err) {
        console.log(`Errored - ${err}`);

        return;
      }

      const colors = palette(pixels.data);
      this.setState({
        isEmpty: false,
        colors
      });
    });
  };

  changeTitleColor = (color) => {
    this.setState({ activeColor: color });
  };

  rgbToHex = (rgb) => {
    const hexArray = rgb.map((component) => {
      const base16 = component.toString(16);
      return base16.length === 1 ? `0${base16}` : base16;
    });
  
    return `#${hexArray.join('')}`;
  };

  render() {
    const {
      colors,
      accept,
      dropzoneActive,
      isEmpty,
      activeColor
    } = this.state;

    const ColorBlocks = colors.map((color) => {
      return <Color key={color} color={color} changeTitleColor={this.changeTitleColor} />;
    });

    const DropFilesHere = dropzoneActive ? <div className={OverlayStyle}>Drop An Image</div> : '';

    const FileInput = <input type="text" className={InputStyle} onChange={this.applyMimeTypes} />;

    const DropHere = <div className={DropHereStyle}>Drop An Image</div>;

    const MainContent = isEmpty ? DropHere : ColorBlocks;

    const ColorCode = (
      <div className={hexCodeStyle}>
        {activeColor.length ? this.rgbToHex(activeColor) : ''}
      </div>
    );

    return (
      <div>
        <Header color={activeColor}>niram</Header>

        <Dropzone
          disableClick
          className={DropzoneStyle}
          accept={accept}
          multiple={false}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}>

          <div className={colorBlocksStyle}>
            {DropFilesHere}
            {FileInput}
            {ColorCode}
            {MainContent}
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default App;
