import React from "react";
import { Header, Image } from "semantic-ui-react";

import SurvivorLogo from "./Survivor-logo.png";

const Home = () => (
  <div>
    <Header
      as="h1"
      textAlign="center"
      style={{
        fontFamily: "'Bungee Inline', cursive",
        color: "rgb(247, 247, 247)",
        marginTop: "30px",
        marginBottom: "20px",
      }}
    >
      Survivor Bingo
    </Header>
    <Image src={SurvivorLogo}></Image>
  </div>
);

export default Home;
