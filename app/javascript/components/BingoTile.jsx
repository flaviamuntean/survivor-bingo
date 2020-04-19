import React from "react";
import { Table } from "semantic-ui-react";

const BingoTile = (props) => {
  return <Table.Cell style={{ fontSize: "0.6em" }}>{props.phrase}</Table.Cell>;
};

export default BingoTile;
