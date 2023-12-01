import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import PhoneImg from '../assets/phone.png';
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Login } from "../components/Login";
import "../App.css";
import '../Fonts/Font.css';
import { AboutWanderWorld } from "../components/AboutWanderWorld/div";
import { ToSignup } from "../components/ToSignup";
import axios from "axios";
import { DataProvider } from "../contexts/DataContext";

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 50px;
  gap: 30px;
  justify-content: center;
  position: relative;
  width: 1300px;
  height: 550px;
`;

const PhoneImage = styled.img`
  height: 584px;
  // left: 321px;
  object-fit: cover;
  // position: absolute;
  // top: 60px;
  width: 400px;
`;


const Home = () => {
  return (
    <Container>
      <InnerContainer>
        <PhoneImage alt="Phone image" src={PhoneImg}/>
        <DataProvider>
          <Login />
        </DataProvider>
        <AboutWanderWorld className="login"/>
      </InnerContainer>
    </Container>
  );
};

export default Home;
