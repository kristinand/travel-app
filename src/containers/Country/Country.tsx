import React, { useEffect } from 'react';
// import classes from './Counry.module.scss';
import '../../css/countries.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import { useTranslation } from 'react-i18next';
import { IState } from '../../redux/reducers/reducerTypes';
import { StarRating } from '../../components/StarRating';
import { Map } from '../../components/Map';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import About from '../../components/About/About';
import Widget from '../../components/Widgets/Widgets';
import Video from '../../components/Video/Video.js';

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

  // функция рендера картинок галереи
  const myRenderItem = (item: { original: string; description: string; originalTitle: string; id: string }) => (
    <div className="image-gallery-container">
      <img className="image-gallery-image" src={item.original} alt="img" />
      <StarRating id={item.id} />
      <span className="image-gallery-description">{item.description}</span>
      <p className="image-gallery-title">{item.originalTitle}</p>
    </div>
  );

  const images = country.attractions.map((attr) => ({
    original: `${attr.imageURL}?fit=crop&w=1000`,
    thumbnail: `${attr.imageURL}?fit=crop&w=100`,
    description: attr.desc,
    originalTitle: attr.name,
    // eslint-disable-next-line no-underscore-dangle
    id: attr._id,
    renderItem: myRenderItem,
  }));

  return (
    <div className="countries">
      <div className="content-wrapper">
        <div className="content">
          <Header inputVisible={false} />
          <Widget lang={lang} country={country} />
          <About imageURL={country.imageURL} country={country.country} capital={country.capital} desc={country.desc} />

          <div className="gallery-block">
            <h2 className="subtitle">{t('title-sights')}</h2>
            <div className="slider">
              <ImageGallery items={images} />
            </div>
          </div>

          <Video videoURL={country.videoURL} country={country.country} />

          <div className="map">
            <div>
              <h2 className="subtitle">{t('title-map')}</h2>
              <Map coordinates={country.coordinates} code={country.ISOCode} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Countries;
