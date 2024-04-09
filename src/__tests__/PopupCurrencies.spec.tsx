import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import PopupCurrencies from '../components/popupCurrencies/PopupCurrencies';
import { store } from '../components/app/store'


describe('<PopupCurrencies />', () => {
  it('отображает список валют', () => {
    render(
      <Provider store={store}>
        <PopupCurrencies changePopupCurrency={() => {}} />
      </Provider>
    );
    expect(screen.getByText('Российский рубль')).toBeInTheDocument();
    expect(screen.getByText('RUR')).toBeInTheDocument();
  });

  it('обрабатывает клик по элементу списка валют', () => {
    const changePopupCurrencyMock = jest.fn();
    
    render(
      <Provider store={store}>
        <PopupCurrencies changePopupCurrency={changePopupCurrencyMock} />
      </Provider>
    );

    fireEvent.click(screen.getByText('RUR'));
    expect(changePopupCurrencyMock).toHaveBeenCalled();
  });

    it('вызывает changePopupCurrency с правильным аргументом', () => {
    const changePopupCurrencyMock = jest.fn();

    render(
      <Provider store={store}>
        <PopupCurrencies changePopupCurrency={changePopupCurrencyMock} />
      </Provider>
    );

    const currencyCode = store.getState().converter.currencies[0].CharCode;
    fireEvent.click(screen.getByText(currencyCode));

    expect(changePopupCurrencyMock).toHaveBeenCalledWith(currencyCode);
  });

  it('обрезает названия валют, которые превышают 20 символов', () => {
    render(
      <Provider store={store}>
        <PopupCurrencies changePopupCurrency={() => {}} />
      </Provider>
    );

    const longCurrencyNameItem = store.getState().converter.currencies.find(c => c.Name.length > 20);
    if (longCurrencyNameItem) {
      const displayedName = screen.getByText(new RegExp(longCurrencyNameItem.Name.slice(0, 20)));
      expect(displayedName).toHaveTextContent(longCurrencyNameItem.Name.slice(0, 20) + '...');
    }
  });

});