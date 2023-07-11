import React from "react";
import "./Countries.scss";
import CountryCard from "../CountryCard/CountryCard";
import CountriesLoading from "./CountriesLoading";

const Countries = ({ countryData, isLoading }) => {
  if (isLoading) {
    return (
      <section className="countries">
        <CountriesLoading />
        <CountriesLoading />
        <CountriesLoading />
        <CountriesLoading />
        <CountriesLoading />
        <CountriesLoading />
        <CountriesLoading />
        <CountriesLoading />
      </section>
    );
  }
  return (
    <section className="countries">
      {countryData.map((country, index) => {
        return <CountryCard key={index} country={country} />;
      })}
    </section>
  );
};

export default Countries;
