// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import BingoBoard from "../components/BingoBoard";

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById("bingo-board");
  const data = JSON.parse(node.getAttribute("data"));
  ReactDOM.render(
    <BingoBoard phrases={data} />,
    document.getElementById("bingo-board")
  );
});
