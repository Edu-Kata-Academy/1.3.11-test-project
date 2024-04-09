import { LegacyRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import "./PopupCurrencies.scss";

type CurrenciesListPropsType = {
  changePopupCurrency: (currency: string) => void;
  popupRef?: LegacyRef<HTMLDivElement> | undefined;
};
const PopupCurrencies = ({ changePopupCurrency }: CurrenciesListPropsType) => {
  const { currencies } = useSelector((state: RootState) => state.converter);

  return (
    <div className="currenciesList">
      {currencies.map((el) => (
        <div
          onClick={() => changePopupCurrency(el.CharCode)}
          key={`${el.Name} ${el.ID}`}
          className="currenciesList-item"
        >
          <span>
            {el.Name.length > 20 ? el.Name.slice(0, 20) : el.Name}
            {el.Name.length > 20 ? "..." : ""}
          </span>
          <span>{el.CharCode}</span>
        </div>
      ))}
    </div>
  );
};

export default PopupCurrencies;
