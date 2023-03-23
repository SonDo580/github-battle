import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Nav from "./components/Nav";
import "./index.css";

const Battle = React.lazy(() => import("./components/Battle"));
const Popular = React.lazy(() => import("./components/Popular"));
const Result = React.lazy(() => import("./components/Result"));

class App extends React.Component {
  state = {
    theme: "light",
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    return (
      <div className={this.state.theme}>
        <div className="container">
          <BrowserRouter>
            <Nav theme={this.state.theme} toggleTheme={this.toggleTheme} />
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Popular />} />
                <Route path="/battle" element={<Battle />} />
                <Route path="/result" element={<Result />} />
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
