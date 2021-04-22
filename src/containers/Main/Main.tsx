import React, { useEffect } from 'react';
// import classes from './Main.module.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IState } from '../../redux/reducers/reducerTypes';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CountryCard from '../../components/CountryCard';
import Clouds from '../../components/Clouds/Clouds';

const Main = () => {
  const countriesMass = useSelector((state: IState) => state.countries);
  const searchValue = useSelector((state: IState) => state.searchValue);
  const filteredCountries = useSelector((state: IState) => state.filteredCountries);
  const lang = useSelector((state: IState) => state.lang);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <div className="app">
      <Header inputVisible />

      <div className="container body">
        <Clouds />
        <main className="body">
          <div className="body-title">
            <h1 className="title">{t('title')}</h1>
            <h2 className="subtitle">{t('subtitle')}</h2>
          </div>
          <div className="countries-block">
            <h3 className="countries-title">{t('title-where')}</h3>
            <div className="countries-grid">
              {searchValue.length
                ? filteredCountries.map((country) => <CountryCard key={country.ISOCode} data={country} />)
                : countriesMass.map((country) => <CountryCard key={country.ISOCode} data={country} />)}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Main;
