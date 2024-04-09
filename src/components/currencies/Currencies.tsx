import { Currency } from "../../types/types"
import { RootState } from "../app/store"
import { useSelector } from 'react-redux';
import './Currencies.scss'

type CurrenciesPropsType = {
  onChangeVisible: () => void
  changeCurrency: (currency: string) => void
  currentCurrency: string
  popupCurrency: Currency | null
  toggle: boolean
}

const Currencies = (props: CurrenciesPropsType) => {

  const {
    popupCurrency, changeCurrency,
    currentCurrency, onChangeVisible,
    toggle
} = props

const { mainCurrencies } = useSelector((state: RootState) => state.converter)

const styleForToggle = `switcher__item ${toggle ? 'active' : ''}`

  return (
    <div className="currencies-switcher">
     <div className="switcher">
      {
        mainCurrencies.map((currency: Currency) => {

          const style = `switcher__item  ${currentCurrency === currency.CharCode ? 'active' : ''}`

          return (
            <div 
            key={`${currency.ID} ${currency.CharCode}`}
            onClick={() => changeCurrency(currency.CharCode)}
            className={style}>{currency.CharCode}</div>
          )
        })
      }
      {
        popupCurrency && (
      <div
        className={`switcher__item ${currentCurrency === popupCurrency.CharCode ? 'active' : ''}`}
        onClick={() => changeCurrency(popupCurrency.CharCode)}>{popupCurrency.CharCode}
      </div>
        )
      }
      <div className={styleForToggle} onClick={() => onChangeVisible()}></div> 
    </div>
  </div>
   
  );

}

export default Currencies;