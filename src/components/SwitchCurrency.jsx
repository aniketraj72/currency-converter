import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

const SwitchCurrency = () => {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } =
    useContext(CurrencyContext);
  const handleSwitch = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    console.log("Handle switch is called");
    console.log("temp: " + temp);
    showMeValue();
  };
  const showMeValue = () => {
    console.log("toCurrency:" + JSON.stringify(toCurrency, null, 2));
    console.log("fromCurrency:" + JSON.stringify(fromCurrency, null, 2));
  };
  return (
    <Grid item xs={12} md={"auto"}>
      <Button
        onClick={handleSwitch}
        sx={{
          borderRadius: 10,
          height: "100%",
        }}
      >
        <CompareArrowsIcon sx={{ fontSize: 30, transform: "rotate(90deg)" }} />
      </Button>
    </Grid>
  );
};

export default SwitchCurrency;
