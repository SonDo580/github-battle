import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "./components/Loading";
import Nav from "./components/Nav";

import "./index.css";

const Battle = React.lazy(() => import("./pages/Battle"));
const Popular = React.lazy(() => import("./pages/Popular"));
const Result = React.lazy(() => import("./pages/Result"));

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <div className={theme}>
      <div className="container">
        <BrowserRouter>
          <Nav theme={theme} toggleTheme={toggleTheme} />

          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Popular />} />
              <Route path="/battle" element={<Battle />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
