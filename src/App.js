import React, { Component } from 'react';
import './App.css';
import Image from './components/Image';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="site-root">
        <Header />
        <div className="site-main">
          { this.props.images.map( ( img, i ) =>
            <Image
              key={i}
              name={img.fileName}
              aspectRatio={img.aspectRatio}
              focalLength={img.focalLength}
              iso={img.iso}
              fStop={img.fStop}
              speed={img.shutterSpeed}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
