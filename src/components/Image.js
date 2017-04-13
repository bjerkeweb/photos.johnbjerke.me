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
    const src = `./images/${this.props.name}`
    return (
      <div>
        <img
          src={src}
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
