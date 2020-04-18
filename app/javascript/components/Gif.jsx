import React, { Component } from "react";

class Gif extends Component {
  render() {
    const url = `https://giphy.com/embed/${this.props.id}`;
    return (
      <iframe
        src={url}
        width="100%"
        height="270"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
    );
  }
}

export default Gif;
