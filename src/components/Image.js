import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

class Image extends Component {

  constructor() {
    super();

    this.onLoad = this.onLoad.bind(this);
    this.toggleOnScreen = this.toggleOnScreen.bind(this);

    this.state = {
      isLoaded: false,
      onScreen: false
    }
  }

  onLoad() {
    this.setState({ isLoaded: true });
  }

  toggleOnScreen() {
    this.setState({ onScreen: !this.state.onScreen });
  }

  render() {
    const url = `./images/${this.props.name}`;
    const imageName = this.props.name.split('.')[0];

    const imgClass = [
      ( this.state.onScreen )
        ? 'is-loaded'
        : 'is-not-loaded',
      'image__img'
    ];

    return (
      <div id={imageName} className="pane pane--image">
        <Waypoint
          key={imageName}
          horizontal={true}
          topOffset="0"
          bottomOffset="0"
          onEnter={ this.toggleOnScreen }
          onLeave={ this.toggleOnScreen }
        >
          <div>
            <img
              style={{ minWidth: `calc( (100vh - 7.5rem) * ${this.props.aspectRatio} )` }}
              className={ imgClass.join(' ') }
              src={url}
            />
            <div className="image-metadata">
             { `\u0192${this.props.fStop}, ` }
             {this.props.speed} sec,{" "}
             {this.props.focalLength},{" "}
             ISO {this.props.iso} 
            </div>
          </div>
        </Waypoint>
      </div>
    )
  }

}

export default Image;
