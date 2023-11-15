import { Container, Typography, Grid, TextField } from "@mui/material";
// import "./App.css";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import { useEffect, useContext, useState } from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import axios from "axios";

const styles = {
  boxStyles: {
    marginTop: "10%",
    background: "#fdfdfd",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    boxSizing: "border-box",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
    position: "relative",
  },
};

// function changeValueBasedUrl(fromCurrency, toCurrency) {
//   fromCurrency = fromCurrency.toLowerCase();
//   toCurrency = toCurrency.toLowerCase();
//   return `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`;
// }
function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount,
    fromCurrencyAmount,
    toCurrencyAmount,
    setFromCurrencyAmount,
    setToCurrencyAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  // console.log(firstAmount);
  // console.log("from currency:" + JSON.stringify(fromCurrency));
  // console.log("to currency: " + JSON.stringify(toCurrency));
  // console.log("from curr amount:: " + fromCurrencyAmount);
  // console.log("to cuyrr amount:" + toCurrencyAmount);
  // console.log("Converted Amount is : " + firstAmount);
  // useEffect(() => {
  //   setFromCurrencyAmount(fromCurrency[Object.keys(fromCurrency[2])]);
  //   setToCurrencyAmount(toCurrency[Object.keys(toCurrency[2])]);
  // }, [fromCurrency, toCurrency, setFromCurrencyAmount, setToCurrencyAmount]);

  console.log("result: " + resultCurrency);
  useEffect(() => {
    if (fromCurrency && fromCurrency.currency) {
      setFromCurrencyAmount(fromCurrency.currency);
    }
  }, [fromCurrency, setFromCurrencyAmount]);

  useEffect(() => {
    if (toCurrency && toCurrency.currency) {
      setToCurrencyAmount(toCurrency.currency);
    }
  }, [toCurrency, setToCurrencyAmount]);

  useEffect(() => {
    if (firstAmount && fromCurrencyAmount && toCurrencyAmount) {
      const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrencyAmount.toLowerCase()}/${toCurrencyAmount.toLowerCase()}.json`;
      axios
        .get(apiUrl)
        .then((res) => {
          const currency = toCurrency["currency"].toLowerCase();
          console.log(currency);
          const exchangeRate = res.data[currency];
          console.log(fromCurrency);
          console.log(toCurrency);
          console.log(res.data);
          console.log(
            "Exchange Rate: " + exchangeRate * parseFloat(firstAmount)
          );
          setResultCurrency(exchangeRate * parseFloat(firstAmount));
        })
        .catch((err) => {
          console.log("Error fetching:" + err);
        });
    }
  }, [
    firstAmount,
    fromCurrencyAmount,
    toCurrencyAmount,
    setFirstAmount,
    fromCurrency,
    toCurrency,
    setResultCurrency,
  ]);

  return (
    <Container maxWidth="md" sx={styles.boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Stay ahead with accurate conversions
      </Typography>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <InputAmount />
        </Grid>
        <Grid item xs={8}>
          <SelectCountry
            value={fromCurrency}
            setValue={setFromCurrency}
            label="From"
          />
        </Grid>
      </Grid>
      <Grid
        container
        columns={16}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <SwitchCurrency />
      </Grid>

      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          {firstAmount ? (
            <TextField
              value={`${resultCurrency} ${toCurrency.flagSymbol} ${toCurrency.currency}`}
              label="Result"
              sx={{ width: "100%" }}
            />
          ) : (
            <TextField
              value={resultCurrency}
              label="Result"
              sx={{ width: "100%" }}
            />
          )}
        </Grid>
        <Grid item xs={8}>
          <SelectCountry
            value={toCurrency}
            setValue={setToCurrency}
            label="To"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
