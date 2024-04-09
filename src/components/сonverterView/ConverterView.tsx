import { Currency } from "../../types/types";
import Currencies from "../currencies/Currencies";
import "./ConverterView.scss";

type ConverterViewType = {
  count: string;
  onChangeFieldValue: (value: string) => void;
  onChangeVisible: () => void;
  changeCurrency: (currency: string) => void;
  currentCurrency: string;
  popupCurrency: Currency | null;
  toggle: boolean;
  changePopupCurrency: (currency: string) => void;
  width?: number;
};

const ConverterView = (props: ConverterViewType) => {
  const { count, onChangeFieldValue, onChangeVisible, toggle, changeCurrency, currentCurrency, popupCurrency } = props;

  const onChangeFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    onChangeFieldValue(value);
  };

  return (
    <>
      <Currencies
        changeCurrency={changeCurrency}
        popupCurrency={popupCurrency}
        onChangeVisible={onChangeVisible}
        currentCurrency={currentCurrency}
        toggle={toggle}
      />
      <div className="box">
        <input className="box__input" type="number" value={count} onChange={onChangeFieldHandler} maxLength={10} />
      </div>
    </>
  );
};

export default ConverterView;
