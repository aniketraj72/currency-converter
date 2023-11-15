import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const CurrencyContext = createContext();
const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState({
    flag: "https://flagcdn.com/at.svg",
    flagSymbol: "🇦🇹",
    currency: "EUR",
    name: "Austria",
  });
  const [toCurrency, setToCurrency] = useState({
    flag: "https://flagcdn.com/us.svg",
    flagSymbol: "🇺🇸",
    currency: "USD",
    name: "United States",
  });
  const [firstAmount, setFirstAmount] = useState("");
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState("");
  const [toCurrencyAmount, setToCurrencyAmount] = useState("");
  const value = {
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
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
CurrencyProvider.propTypes = {
  children: PropTypes.node,
};
export default CurrencyProvider;
