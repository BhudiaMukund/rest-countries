import React from "react";
import "./CountryCard.scss";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <article className="card">
      <Link className="link" to={`/country/${country.name.common}`}>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
        <div className="details-container">
          <h1>{country.name.common}</h1>
          <span>
            <strong>Population: </strong>
            {country.population.toLocaleString()}
          </span>
          <span>
            <strong>Region: </strong>
            {country.region}
          </span>
          <span>
            <strong>Capital: </strong>
            {country.capital ? country.capital : "--"}
          </span>
        </div>
      </Link>
    </article>
  );
};

export default CountryCard;
