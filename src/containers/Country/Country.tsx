import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Country.module.scss';
import { IState } from '../../redux/reducers/reducerTypes';
import Header from '../Header/Header';
import About from '../../components/About/About';
import Gallery from '../../components/Gallery/Gallery';
import Video from '../../components/Video/Video';
import Map from '../../components/Map/Map';
import Footer from '../../components/Footer/Footer';

interface paramTypes {
  ISOCode: string;
}

const Countries = () => {
  const { ISOCode } = useParams<paramTypes>();
  const lang = useSelector((state: IState) => state.lang);
  const country = useSelector((state: IState) => state.countries.find((countryObj) => countryObj.ISOCode === ISOCode))!;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <div className={classes.countryWrapper}>
      <div className={classes.country}>
        <Header inputVisible={false} />
        <About country={country} lang={lang} />
        <Gallery attractions={country.attractions} title={t('title-sights')} />
        <Video videoURL={country.videoURL} country={country.country} />
        <Map coords={country.coordinates} code={country.ISOCode} title={t('title-map')} />
      </div>
      <Footer />
    </div>
  );
};

export default Countries;
