import React from "react";
import { Table } from "semantic-ui-react";

const BingoBoard = (props) => {
  const { phrases } = props;
  const randomPhrase = () => {
    return phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();
  };

  return (
    <Table celled unstackable>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
          <Table.Cell width={4}>{randomPhrase()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default BingoBoard;
