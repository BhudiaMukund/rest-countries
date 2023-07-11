import React from "react";
import { Skeleton } from "@mui/material";

const CountriesLoading = () => {
  return (
    <div>
      <Skeleton animation="wave" variant="rectangular" height={250} />
      <Skeleton animation="wave" />
      <Skeleton animation="text" width="75%" />
      <Skeleton animation="text" width="75%" />
      <Skeleton animation="text" width="75%" />
    </div>
  );
};

export default CountriesLoading;
