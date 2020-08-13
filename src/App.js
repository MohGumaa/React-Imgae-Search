import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import NavBar from "./components/navbar/NavBar";
import SearchForm from "./components/search/SearchForm";
import "./App.css";

function App() {
  return (
    <MuiThemeProvider>
      <NavBar />
      <SearchForm />
    </MuiThemeProvider>
  );
}

export default App;
