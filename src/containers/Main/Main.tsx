import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classes from './Main.module.scss';
import { IState } from '../../redux/reducers/reducerTypes';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CountriesList from '../../components/CountriesList/CountriesList';
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
    <div className={classes.bg}>
      <Header inputVisible />

      <div className="container body">
        <Clouds />
        <main className={classes.main}>
          <div className={classes.titleWrapper}>
            <div>{t('title')}</div>
            <div className={classes.subtitle}>{t('subtitle')}</div>
          </div>
          <CountriesList title={t('title-where')} countries={searchValue.length ? filteredCountries : countriesMass} />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Main;
