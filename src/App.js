import "./App.css";
import React, { lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";

import { CircularProgress } from "@mui/material";
import styled from "styled-components/macro";
import Header from "./Components/Header";

const Home = lazy(() => import("./Pages/Home"));

function App() {
  return (
    <div className="App">
      <Suspense
        fallback={
          <Box>
            <CircularProgress />
          </Box>
        }
      >
        <Router>
          <Header />
          <Switch>
            <Route path="/" element={<Home />} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
const Box = styled.div`
  width: 96%;
  height: 80vh;
  display: grid;
  place-items: center;
`;
