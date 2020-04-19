import React, { Component } from "react";
import Header from "../components/Header";
import PropTypes from "prop-types";
import SimpleStorage from "react-simple-storage";
import momentDurationFormatSetup from "moment-duration-format";
import Jeff from "./Jeff_Probst.png";

class BingoBoard extends Component {
  copyObject(obj) {
    return Object.assign({}, obj);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  constructor(props) {
    super(props);
    const { phrases } = props;
    const size = props.size % 2 ? props.size : props.size - 1;
    const cellCount = size * size;
    const midpoint = (size * size - 1) / 2;

    this.state = {
      activeCell: 0,
      activeRow: 0,
      activeCol: 0,
      endTime: 0,
      endTimeFull: 0,
      bingo: false,
      fullHouse: false,
      grid: this.generateRandomGrid(phrases, size),
      midpoint: midpoint,
      selection: { [midpoint]: true },
      size: size,
      startTime: Date.now(),
      phrases: phrases,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // not a new board
    if (prevState.startTime === this.state.startTime) {
      // focus active cell
      if (prevState.activeCell !== this.state.activeCell) {
        document
          .getElementById(this.props.id + "-cell-" + this.state.activeCell)
          .focus();
      }
      // if selection has changed in some way, check for full house

      // if selection has changed in some way, check for bingo
      if (prevState.selection !== this.state.selection) {
        if (this.checkBoard()) {
          if (!this.state.fullHouse) {
            this.setState({
              fullHouse: true,
              endTimeFull: Date.now(),
            });
          }
        } else if (
          this.checkRow(this.state.activeRow) ||
          this.checkCol(this.state.activeCol)
        ) {
          if (!this.state.bingo) {
            this.setState({
              bingo: true,
              endTime: Date.now(),
            });
          }
        }
      }
    }
  }

  checkIndices(indices) {
    for (let i = 0; i < indices.length; i++) {
      let index = indices[i];
      if (!this.state.selection[index]) {
        return false;
      }
    }
    return true;
  }

  checkRow(row) {
    const size = this.state.size;
    const rowStart = row * size;
    for (let i = rowStart; i < rowStart + size; i++) {
      if (!this.state.selection[i]) {
        return false;
      }
    }

    return true;
  }

  checkCol(col) {
    const size = this.state.size;
    for (let j = col; j < size * size; j += size) {
      if (!this.state.selection[j]) {
        return false;
      }
    }
    return true;
  }

  checkBoard() {
    return this.checkIndices(Array.from(Array(25).keys()));
  }

  refreshBoard = () => {
    this.setState({
      activeCell: 0,
      activeRow: 0,
      activeCol: 0,
      bingo: false,
      fullHouse: false,
      grid: this.generateRandomGrid(this.state.phrases, this.state.size),
      leaderboardSubmitted: false,
      selection: { [this.state.midpoint]: true },
      startTime: Date.now(),
      endTime: 0,
    });
  };

  setActiveCell(row, col) {
    this.setState({ activeCell: this.state.grid[row][col].id });
  }

  generateRandomGrid(phrases, size) {
    const randomizedPhrases = this.shuffleArray(phrases);

    let grid = [];
    for (let row = 0; row < size; row++) {
      grid[row] = [];
      for (let col = 0; col < size; col++) {
        let id = col + row * size;
        grid[row][col] = {
          value: randomizedPhrases[id],
          id: id,
        };
      }
    }

    return grid;
  }

  renderMidpointCell(cellId, row, col) {
    return (
      <td
        role="gridcell"
        key={cellId}
        style={{
          backgroundImage: `url(${Jeff})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="cell-contents">
          <button
            disabled
            aria-disabled={true}
            aria-pressed={true}
            className="cell-toggle midpoint-cell"
            id={this.props.id + "-cell-" + cellId}
            onClick={() => {
              this.setState({ activeCell: cellId });
            }}
            tabIndex={cellId === this.state.activeCell ? "0" : "-1"}
          ></button>
        </div>
      </td>
    );
  }

  renderCell(cell, row, col) {
    const isMidpoint = cell.id === this.state.midpoint;
    const selected = this.state.selection[cell.id] || isMidpoint ? true : false;

    if (isMidpoint) {
      return this.renderMidpointCell(cell.id, row, col);
    }

    return (
      <td role="gridcell" key={cell.id}>
        <div className="cell-contents">
          <button
            aria-pressed={selected}
            className="cell-toggle"
            id={this.props.id + "-cell-" + cell.id}
            onClick={() => {
              let selection = this.copyObject(this.state.selection);
              selection[cell.id] = !selected;

              this.setState({
                selection: selection,
                activeCell: cell.id,
                activeRow: row,
                activeCol: col,
              });
            }}
            // onKeyDown={(event) => {
            //   this.handleKeyDown(event, row, col);
            // }}
            tabIndex={cell.id === this.state.activeCell ? "0" : "-1"}
          >
            {cell.value.toUpperCase()}
          </button>
        </div>
      </td>
    );
  }

  renderRow(row, y) {
    return (
      <tr role="row" key={y}>
        {row.map((cell, x) => {
          return this.renderCell(cell, y, x);
        })}
      </tr>
    );
  }

  renderSuccess() {
    if (this.state.fullHouse) {
      return (
        <div
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "53%",
            position: "relative",
          }}
        >
          <iframe
            src="https://giphy.com/embed/l0FhDDGgkZjE0Khc4"
            width="100%"
            height="100%"
            style={{ position: "absolute" }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else if (this.state.bingo) {
      return (
        <div
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "53%",
            position: "relative",
          }}
        >
          <iframe
            src="https://giphy.com/embed/3q1xJyly2WIbFlYoek"
            width="100%"
            height="100%"
            style={{ position: "absolute" }}
            frameBorder="0"
            className="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <Header
          gotFullHouse={this.state.fullHouse}
          gotBingo={this.state.bingo}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
        >
          <button
            className="ui button primary mini align-self-end"
            onClick={this.refreshBoard}
          >
            New Board
          </button>
        </Header>

        <main className="m-3">
          <table
            role="grid"
            className="ui fixed table celled unstackable"
            style={{ fontSize: "0.6em", borderRadius: "0" }}
          >
            <tbody role="rowgroup">
              {this.state.grid.map((row, y) => {
                return this.renderRow(row, y);
              })}
            </tbody>
          </table>
          {this.renderSuccess()}
        </main>
        {/* Stores current board state in local storage so
             game is preserved even when refreshed */}
        <SimpleStorage
          parent={this}
          prefix={`bingo-${this.props.username}-${this.props.gameId}`}
          blacklist={["activeCell", "activeRow", "activeCol", "phrases"]}
        />
      </div>
    );
  }
}

BingoBoard.propTypes = {
  size: PropTypes.number,
  phrases: PropTypes.array,
};

BingoBoard.defaultProps = {
  size: 5,
  phrases: "abcdefghijklmnopqrstuv".split(""),
};

export default BingoBoard;
