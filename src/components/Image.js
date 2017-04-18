import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import Imgix from 'react-imgix';

class Image extends Component {

  constructor() {
    super();

    this.onLoad = this.onLoad.bind(this);
    this.setOnScreen = this.setOnScreen.bind(this);

    this.state = {
      isLoaded: false,
      onScreen: false
    }
  }

  onLoad() {
    this.setState({ isLoaded: true });
  }
  
  setOnScreen() {
    this.setState({ onScreen: true });
  }

  render() {
    const url = `https://johnbjerkephotos.imgix.net/${this.props.name}`;
    const imageName = this.props.name.split('.')[0];

    const imgClass = [
      ( this.state.onScreen && this.state.isLoaded ) ? 'is-loaded' : 'is-not-loaded',
        'image__img'
    ];

    const image = (
      <Imgix
        fit={"max"}
        src={url}
        imgProps={{ onLoad: this.onLoad }}
        className={imgClass.join(' ')}
      />
    )

    const spinner = !this.state.isLoaded ? <div className="spinner" /> : null

    const placeholder = (
      <div className="image__img" />
    )

    const isFrac = this.props.speed.indexOf('/') !== -1;

    const speed = isFrac
      ? <span className="frac">{ this.props.speed }</span>
      : <span>{ this.props.speed }</span>

    return (
      <div id={imageName} className="pane pane--image">
        { spinner }
        <Waypoint
          key={imageName}
          horizontal={true}
          topOffset="0"
          bottomOffset="0"
          onEnter={ this.setOnScreen }
        >
          <div
            className="pane__image"
            style={{ minWidth: `calc( (100vh - 7.2rem) * ${this.props.aspectRatio} )` }}
          >
            { this.state.onScreen ? image : placeholder }
          </div>
        </Waypoint>
        <div className="image-metadata">
         { `\u0192${this.props.fStop}, ` }
         {speed} sec,{" "}
         {this.props.focalLength},{" "}
         ISO {this.props.iso} 
        </div>
      </div>
    )
  }

}

export default Image;
