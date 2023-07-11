import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import {
  FormControl,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({
  data,
  countryData,
  setCountryData,
  isLoading,
  setIsLoading,
}) => {
  const [filter, setFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const [showError, setShowError] = useState(false);
  const handleClick = () => {
    setShowError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowError(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (filter === "" && regionFilter === "") {
      setCountryData(data);
    } else if (filter === "" && regionFilter !== "") {
      const filteredCountries = data.filter((country) => {
        return country.region === regionFilter;
      });

      setCountryData(filteredCountries);
    } else if (filter !== "" && regionFilter === "") {
      const filteredCountries = data.filter((country) => {
        return country.name.common.toLowerCase().includes(filter.toLowerCase());
      });
      setCountryData(filteredCountries);
    } else {
      const filteredCountries = data.filter((country) => {
        return (
          country.name.common.toLowerCase().includes(filter.toLowerCase()) &&
          country.region === regionFilter
        );
      });
      setCountryData(filteredCountries);
    }
    setIsLoading(false);
  }, [filter, regionFilter]);

  useEffect(() => {
    if (!isLoading) {
      if (countryData.length === 0) {
        handleClick();
      } else {
        handleClose();
      }
    }
  }, [countryData]);

  return (
    <nav>
      <TextField
        variant="outlined"
        className="input-field"
        placeholder="Search for a country..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControl>
        <InputLabel id="filter-select-label">Filter by region</InputLabel>
        <Select
          value={regionFilter}
          className="select"
          onChange={(e) => setRegionFilter(e.target.value)}
          label="Filter by Region"
          labelId="filter-select-label"
        >
          <MenuItem value="">Filter by region</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">America</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
      <Snackbar open={showError} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          No results found. You are searching for{" "}
          {filter !== "" ? `"${filter}"` : null}{" "}
          {regionFilter !== "" ? ` in "${regionFilter}" region` : null}
        </Alert>
      </Snackbar>
    </nav>
  );
};

export default SearchBar;
