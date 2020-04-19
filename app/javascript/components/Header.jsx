import React, { Component } from "react";
import moment from "moment";

class Header extends Component {
  renderSuccess() {
    if (this.props.gotFullHouse) {
      return (
        <span className="align-self-center" style={{ color: "white" }}>
          Full House! <br /> Total time:{" "}
          {moment
            .duration(this.props.endTime - this.props.startTime)
            .format("h [hr], m [min], s [sec]")}{" "}
          ✌️
        </span>
      );
    } else if (this.props.gotBingo) {
      return (
        <span className="align-self-center" style={{ color: "white" }}>
          Bingo! <br /> Total time:{" "}
          {moment
            .duration(this.props.endTime - this.props.startTime)
            .format("h [hr], m [min], s [sec]")}{" "}
          🎉
        </span>
      );
    }
    return <span></span>;
  }

  render() {
    return (
      <header className="ui dividing header m-3 d-flex justify-content-between">
        {this.renderSuccess()}
        {this.props.children}
      </header>
    );
  }
}

export default Header;
