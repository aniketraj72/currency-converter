import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CurrencyContext } from "../context/CurrencyContext";
import { useContext } from "react";

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);
  const handleInputChange = (event) => {
    console.log("e148 :" + event.target.value);
    // const value = parseFloat(event.target.value);
    // setFirstAmount(isNaN(value) ? 0 : value);
    setFirstAmount(event.target.value);
  };
  return (
    <Grid item xs={12} md >
      <TextField
        value={firstAmount}
        onChange={handleInputChange}
        label="Amount"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
    </Grid>
  );
};

export default InputAmount;
