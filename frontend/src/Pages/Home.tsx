import React, { useState } from "react";
import { Typography, Button, TextField } from "@mui/material";
import PageImage from '../assets/wanderworldPage.png';
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
  height: 340px;
  object-fit: cover;
  width: 600px;
  margin-top: 100px;
`;


const Home = () => {
  return (
    <Container>
      <InnerContainer>
        <DataProvider>
          <Login />
        </DataProvider>
        <AboutWanderWorld className="login"/>
      </InnerContainer>
    </Container>
  );
};

export default Home;
