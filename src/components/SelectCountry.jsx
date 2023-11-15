import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useAxios from "../hooks/useAxios";
import { useState, useEffect, useContext } from "react";
import { Skeleton } from "@mui/material";
import { CurrencyContext } from "../context/CurrencyContext";
import PropTypes from "prop-types";

// const SelectCountry = () => {
//   const [data] = useAxios("https://restcountries.com/v3.1/all");

//   const dataFilter = data.filter((item) => "currencies" in item);
//   const dataCountries = dataFilter.map((item) => {
//     return `${item.flag} ${Object.keys(item.currencies)[0]} - ${
//       item.name.common
//     }`;
//   });
//   console.log(dataCountries);
//   return (
//     <Grid item xs={12} md={3}>
//       <Autocomplete
//         value="option1"
//         options={dataCountries}
//         renderInput={(params) => <TextField {...params} label="from" />}
//       />
//     </Grid>
//   );
// };

// export default SelectCountry;

const SelectCountry = (props) => {
  const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");
  const [countryOptions, setCountryOptions] = useState([]); // Define countryOptions state
  // const [selectedCountry, setSelectedCountry] = useState(null);
  const { label } = props;
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } =
    useContext(CurrencyContext);

  SelectCountry.propTypes = {
    value: PropTypes.any, // Replace 'any' with the specific data type expected for the 'value' prop
    setValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  };
  useEffect(() => {
    if (data) {
      const dataFilter = data.filter((item) => "currencies" in item);
      // console.log("dataFilter" + typeof dataFilter);
      // dataFilter.forEach((item) => {
      //   console.log(item.name);
      // });
      const dataCountries = dataFilter.map((item) => {
        return {
          flag: item.flags.svg,
          flagSymbol: item.flag,
          currency: Object.keys(item.currencies)[0],
          name: item.name.common,
        };
      });
      setCountryOptions(dataCountries);
      // console.log(dataCountries);
    }
  }, [data]);

  if (loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rouned" height={60} />
      </Grid>
    );
  }

  if (error) {
    return "Something went wrong";
  }

  return (
    <Grid item xs={12} md>
      <Autocomplete
        value={label === "From" ? fromCurrency : toCurrency}
        options={countryOptions}
        getOptionLabel={(option) =>
          `${option.flagSymbol}  ${option.currency} - ${option.name}`
        }
        onChange={(event, newValue) => {
          // setSelectedCountry(newValue);
          // console.log("Selected Country : " + selectedCountry);

          if (label === "From") {
            setFromCurrency(newValue);
          } else if (label === "To") {
            setToCurrency(newValue);
          }
          // console.log(event.target.value);
          // console.log("NewValue:" + JSON.stringify(newValue, null, 2));
          // console.log("Value:" + value);
          // console.log("FromValue: " + JSON.stringify(fromCurrency, null, 2));
          // console.log("tocurrency:" + JSON.stringify(toCurrency, null, 2));
        }}
        isOptionEqualToValue={(option, value) =>
          option.currency === value.currency
        }
        renderInput={(params) => <TextField {...params} label={label} />}
        renderOption={(props, option) => (
          <li {...props}>
            {`${option.flagSymbol}`}
            &nbsp;
            {` ${option.currency} - ${option.name}`}
          </li>
        )}
      />
    </Grid>
  );
};

export default SelectCountry;
