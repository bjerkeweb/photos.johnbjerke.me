import React, { Component } from 'react';

class Image extends Component {

  constructor() {
    super();

    this.state = {
      imageLoaded: false,
      onScreen: false
    }
  }

  render() {
    const url = `./images/${this.props.name}`;
    const imageName = this.props.name.split('.')[0];
    return (
      <div id={imageName} className="pane pane--image">
        <img
          style={{ minWidth: `calc( (100vh - 9rem) * ${this.props.aspectRatio} )` }}
          src={url}
        />
        <div className="image-metadata">
         { `\u0192${this.props.fStop}, ` }
         {this.props.speed} sec,{" "}
         {this.props.focalLength},{" "}
         ISO {this.props.iso} 
        </div>
      </div>
    )
  }

}

export default Image;
