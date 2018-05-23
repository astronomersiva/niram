import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// file upload
import Dropzone from 'react-dropzone';

// image processing related
import getPixels from 'get-pixels';
import palette from 'get-rgba-palette';

// css in js :P
import { css } from 'react-emotion';

// components
import Loading from './Loading';
import Color from './Color';
import FileInput from './FileInput';
import ColorCode from './ColorCode';
import Header from './Header';

// css in js :P
const colorBlocksStyle = css`
  padding: 6vw 0;
  min-height: 60vh;
`;

const DropzoneStyle = css`
  position: relative;
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
    isLoading: false,
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

  onDrop = files => {
    this.setState({
      files,
      dropzoneActive: false,
      isLoading: true
    });

    files.forEach(file => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileContent = reader.result;
        this.getColors(fileContent);
      };

      reader.onabort = () => this.setState({ isLoading: false, isEmpty: true });
      reader.onerror = () => this.setState({ isLoading: false, isEmpty: true });
    });
  };

  applyMimeTypes = event => {
    this.setState({ accept: event.target.value });
  };

  getColors = image => {
    return getPixels(image, (err, pixels) => {
      if (err) {
        console.log(`Errored - ${err}`);
        this.setState({ isLoading: false, isEmpty: true });

        return;
      }

      const colors = palette(pixels.data);
      this.setState({
        isEmpty: false,
        isLoading: false,
        colors
      });
    });
  };

  changeTitleColor = color => {
    this.setState({ activeColor: color });
  };

  render() {
    const {
      colors,
      accept,
      dropzoneActive,
      isEmpty,
      isLoading,
      activeColor
    } = this.state;

    let dropzoneRef;

    const ColorBlocks = colors.map(color => {
      return (
        <Color
          key={color}
          color={color}
          changeTitleColor={this.changeTitleColor}
        />
      );
    });

    const DropFilesHere = dropzoneActive ? (
      <div className={OverlayStyle}>Drop An Image</div>
    ) : (
      ''
    );

    const DropHere = (
      <div
        onClick={() => {
          dropzoneRef.open();
        }}
        className={DropHereStyle}
      >
        Drop An Image
      </div>
    );

    const MainContent = isEmpty ? DropHere : ColorBlocks;

    return (
      <div>
        <Header activeColor={activeColor} />
        <Dropzone
          disableClick
          className={DropzoneStyle}
          accept={accept}
          multiple={false}
          ref={node => {
            dropzoneRef = node;
          }}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          <div className={colorBlocksStyle}>
            {DropFilesHere}
            <FileInput applyMimeTypes={this.applyMimeTypes} />
            <ColorCode activeColor={activeColor} />
            {isLoading ? <Loading /> : MainContent}
          </div>
        </Dropzone>
      </div>
    );
  }
}

export default hot(module)(App);
