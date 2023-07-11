import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import Countries from "../../components/Countries/Countries";

const Home = ({
  theme,
  setTheme,
  data,
  isLoading,
  countryData,
  setCountryData,
  setIsLoading,
}) => {
  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <main>
        <SearchBar
          data={data}
          setCountryData={setCountryData}
          countryData={countryData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <Countries countryData={countryData} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Home;
