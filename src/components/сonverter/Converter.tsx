import { useState, useRef, useEffect } from "react";
import { Currency } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import ConverterView from "../сonverterView/ConverterView";
import { setPopupCurrency } from "../../services/currenciesSlice";
import PopupCurrencies from "../popupCurrencies/PopupCurrencies";

import "./Converter.scss";

type ConverterPropsType = {
  rateFirstCurrency: number;
  rateSecondCurrency: number;
  changeCurrency: (currencyOfFirstField: string, currencyOfSecondField: string, value: string) => void;
  currencies: Currency[];
  changeFirstFieldValue: (value: string) => void;
  changeSecondFieldValue: (value: string) => void;
};

const Converter = (props: ConverterPropsType) => {
  const { changeFirstFieldValue, changeSecondFieldValue, changeCurrency, rateFirstCurrency, rateSecondCurrency } =
    props;

  const [isVisible, setIsVisible] = useState<{ list: "first" | "second" | null }>({ list: null });

  const {
    firstPopupCurrency,
    secondPopupCurrency,
    currencyFirstField,
    currencySecondField,
    countFirstField,
    countSecondField,
  } = useSelector((state: RootState) => state.converter);
  const dispatch = useDispatch();

  const popupRef = useRef<any>();
  useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [isVisible]);

  const onChangeVisible = (value: "first" | "second" | null) => {
    setIsVisible({ list: value });
  };

  const handleOutsideClick = (e: any) => {
    if (e.path) {
      if (!e.path.includes(popupRef.current)) {
        setIsVisible({ list: null });
      }
    }
  };

  const onChangeCurrencyFirstField = (currencyOfFirstField: string) => {
    changeCurrency(currencyOfFirstField, currencySecondField, countFirstField);
  };
  const onChangeCurrencySecondField = (currencyOfSecondField: string) => {
    changeCurrency(currencyFirstField, currencyOfSecondField, countFirstField);
  };
  const changeFirstPopupCurrency = (currency: string) => {
    onChangeVisible(null);
    if (
      secondPopupCurrency &&
      !(currency === "USD" || currency === "EUR" || currency === "RUR" || currency === "JPY")
    ) {
      dispatch(
        setPopupCurrency({
          firstPopupCurrencyCharCode: currency,
          secondPopupCurrencyCharCode: secondPopupCurrency.CharCode,
        })
      );
    }
    onChangeCurrencyFirstField(currency);
  };

  const changeSecondPopupCurrency = (currency: string) => {
    onChangeVisible(null);
    if (firstPopupCurrency && !(currency === "USD" || currency === "EUR" || currency === "RUR" || currency === "JPY")) {
      dispatch(
        setPopupCurrency({
          firstPopupCurrencyCharCode: firstPopupCurrency.CharCode,
          secondPopupCurrencyCharCode: currency,
        })
      );
    }
    onChangeCurrencySecondField(currency);
  };

  const swapCurrencies = () => {
    if (firstPopupCurrency && secondPopupCurrency) {
      changeCurrency(currencySecondField, currencyFirstField, countFirstField);
      dispatch(
        setPopupCurrency({
          firstPopupCurrencyCharCode: secondPopupCurrency.CharCode,
          secondPopupCurrencyCharCode: firstPopupCurrency.CharCode,
        })
      );
    }
  };

  const rateForFirstField = rateFirstCurrency.toFixed(2);
  const rateForSecondField = rateSecondCurrency.toFixed(2);
  const toggleForFirst = isVisible.list === "first";
  const toggleForSecond = isVisible.list === "second";

  return (
    <>
      <header>
        <h1>Конвертер валют онлайн</h1>
      </header>
      <main className="main">
        <div className="converter">
          <div className="converter__title">У меня есть</div>
          <ConverterView
            changePopupCurrency={changeFirstPopupCurrency}
            toggle={toggleForFirst}
            popupCurrency={firstPopupCurrency}
            count={countFirstField}
            changeCurrency={onChangeCurrencyFirstField}
            onChangeVisible={() => onChangeVisible("first")}
            onChangeFieldValue={changeFirstFieldValue}
            currentCurrency={currencyFirstField}
          />
          <div className="box__rate">
            1 {currencyFirstField} = {rateForFirstField} {currencySecondField}
          </div>
        </div>
        <div className="direction">
          <div className="direction__reverse" onClick={() => swapCurrencies()}></div>
        </div>
        <div className="converter">
          <div className="converter__title">Хочу приобрести</div>
          <ConverterView
            toggle={toggleForSecond}
            popupCurrency={secondPopupCurrency}
            count={countSecondField}
            changeCurrency={onChangeCurrencySecondField}
            onChangeVisible={() => onChangeVisible("second")}
            onChangeFieldValue={changeSecondFieldValue}
            currentCurrency={currencySecondField}
            changePopupCurrency={changeSecondPopupCurrency}
          />
          <div className="box__rate">
            1 {currencySecondField} = {rateForSecondField} {currencyFirstField}
          </div>
        </div>
        {isVisible.list && (
          <PopupCurrencies
            popupRef={popupRef}
            changePopupCurrency={isVisible.list === "first" ? changeFirstPopupCurrency : changeSecondPopupCurrency}
          />
        )}
      </main>
    </>
  );
};

export default Converter;
