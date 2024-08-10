import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import "./App.css";
import GlobalErrorBoundary from "./services/errorBoundary";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <GlobalErrorBoundary>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        style={{ zIndex: 1203 }}
        autoHideDuration={2000}
      >
        <Router>
          <div className="App">
            <header className="App-header">
              <h1>Movie Explorer</h1>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </SnackbarProvider>
    </GlobalErrorBoundary>
  );
}

export default App;
