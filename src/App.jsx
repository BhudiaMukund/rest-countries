import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Country from "./pages/Country/Country";

function App() {
  const [data, setData] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Configure theme
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return "dark";
  });

  useEffect(() => {
    const body = document.body;
    if (theme === "dark") {
      if (body.classList.contains("light")) {
        body.classList.remove("light");
      }
    } else {
      body.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://restcountries.com/v3.1/all");
        const json = await response.json();
        setData(json);
        setCountryData(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={
              <Home
                data={data}
                countryData={countryData}
                setCountryData={setCountryData}
                isLoading={isLoading}
                theme={theme}
                setTheme={setTheme}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/country/:countryName"
            element={
              <Country
                theme={theme}
                setTheme={setTheme}
                data={data}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
