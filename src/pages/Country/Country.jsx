import React, { useEffect, useState } from "react";
import "./Country.scss";

import Header from "../../components/Header/Header";

import { Link, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Skeleton } from "@mui/material";

const Country = ({ theme, setTheme, data, isLoading }) => {
  const [countryLoading, setCountryLoading] = useState(true);
  const { countryName } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

  const [nativeName, setNativeName] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [borderCountries, setBorderCountries] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      setCountryLoading(true);
      const filteredCountryDetails = data.filter((country) => {
        return country.name.common === countryName;
      });
      setCountryDetails(filteredCountryDetails[0]);
      setCountryLoading(false);
    } else if (isLoading) {
      setCountryLoading(true);
    }
  }, [isLoading]);

  // Filter out fields that were not readily available
  useEffect(() => {
    if (!countryLoading) {
      const findNativeName = () => {
        const keys = Object.keys(countryDetails.name.nativeName);
        return countryDetails.name.nativeName[keys[0]].common;
      };
      setNativeName(findNativeName());

      const findCurrencies = () => {
        const results = [];

        const keys = Object.keys(countryDetails.currencies);
        keys.forEach((key) => {
          results.push(countryDetails.currencies[key].name);
        });

        return results;
      };
      setCurrencies(findCurrencies());

      const findLanguages = () => {
        const results = [];
        const keys = Object.keys(countryDetails.languages);
        keys.forEach((key) => {
          results.push(countryDetails.languages[key]);
        });
        return results;
      };
      setLanguages(findLanguages());

      const findBorders = () => {
        const results = [];
        const borders = countryDetails.borders;
        if (borders) {
          borders.forEach((border) => {
            data.forEach((country) => {
              if (
                border === country.cca2 ||
                border === country.ccn3 ||
                border === country.cca3 ||
                border === country.cioc
              ) {
                results.push(country.name.common);
              }
            });
          });
        }
        return results;
      };
      setBorderCountries(findBorders());
    }
  }, [countryDetails]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <main className="country">
        <nav>
          <button>
            <Link to="#" className="link" onClick={goBack}>
              <KeyboardBackspaceIcon /> Back
            </Link>
          </button>
        </nav>
        <div className="country">
          <section className="image-container">
            {countryLoading ? (
              <Skeleton variant="rectangular" height={300} width="100%" />
            ) : (
              <img
                src={countryDetails.flags.svg}
                alt={
                  countryDetails.flags.alt
                    ? countryDetails.flags.alt
                    : `Flag of ${countryDetails.name.common}`
                }
              />
            )}
          </section>
          <section className="details-container">
            <h1>
              {countryLoading ? (
                <Skeleton variant="text" width="100%" />
              ) : (
                countryDetails.name.common
              )}
            </h1>
            <div className="flex-box">
              <article>
                {countryLoading ? (
                  <>
                    <Skeleton variant="text" width={225} />
                    <Skeleton variant="text" width={225} />
                    <Skeleton variant="text" width={225} />
                    <Skeleton variant="text" width={225} />
                    <Skeleton variant="text" width={225} />
                  </>
                ) : (
                  <>
                    <span>
                      <strong>Native Name: </strong>
                      {nativeName}
                    </span>
                    <span>
                      <strong>Population: </strong>
                      {countryDetails.population.toLocaleString()}
                    </span>
                    <span>
                      <strong>Region: </strong>
                      {countryDetails.region}
                    </span>
                    <span>
                      <strong>Sub Region: </strong>
                      {countryDetails.subregion}
                    </span>
                    <span>
                      <strong>Capital: </strong>
                      {countryDetails.capital}
                    </span>
                  </>
                )}
              </article>
              <article>
                {countryLoading ? (
                  <>
                    <Skeleton variant="text" width={225} />
                    <Skeleton variant="text" width={225} />
                    <Skeleton variant="text" width={225} />
                  </>
                ) : (
                  <>
                    <span>
                      <strong>Top Level Domain: </strong>
                      {countryDetails.tld.toLocaleString()}
                    </span>
                    <span>
                      <strong>Currencies: </strong>
                      {currencies && currencies.length > 1
                        ? currencies.join(", ")
                        : currencies}
                    </span>
                    <span>
                      <strong>Languages: </strong>
                      {languages && languages.length > 1
                        ? languages.join(", ")
                        : languages}
                    </span>
                  </>
                )}
              </article>
            </div>

            <div className="borders">
              {countryLoading ? (
                <Skeleton variant="text" width={150} height={30} />
              ) : (
                <span>
                  <strong>Border Countries: </strong>
                </span>
              )}
              {countryLoading ? (
                <div className="border-countries-container">
                  <Skeleton variant="text" width={100} height={50} />
                  <Skeleton variant="text" width={100} height={50} />
                  <Skeleton variant="text" width={100} height={50} />
                </div>
              ) : (
                <div className="border-countries-container">
                  {borderCountries && borderCountries.length > 0
                    ? borderCountries.map((border) => {
                        return (
                          <Link
                            className="link"
                            to={`/country/${border}`}
                            onClick={() => {
                              window.location.href = `/country/${border}`;
                            }}
                          >
                            {border}
                          </Link>
                        );
                      })
                    : "None"}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Country;
