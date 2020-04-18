import React from "react";
import { Button, Header, Image } from "semantic-ui-react";
import SurvivorLogo from "./Survivor-logo.png";

const Home = () => (
  <div>
    <Header
      as="h1"
      textAlign="center"
      style={{
        fontFamily: "'Bungee Inline', cursive",
        color: "#2185D0",
        marginTop: "15px",
        marginBottom: "20px",
      }}
    >
      Survivor Bingo
    </Header>
    <Image src={SurvivorLogo}></Image>
    <Header
      as="h2"
      textAlign="center"
      style={{
        fontFamily: "'Boogaloo', cursive",
      }}
    >
      Survivors - Ready?!
    </Header>
  </div>
);

export default Home;
