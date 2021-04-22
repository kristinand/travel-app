import React from 'react';
import classes from './About.module.scss';
import { ICountry } from '../../redux/reducers/reducerTypes';
import Widgets from '../Widgets/Widgets';

interface Props {
  country: ICountry;
  lang: string;
}

function About(props: Props) {
  const {
    country: { country: countryName, capital, desc, imageURL, currency, timezone, coordinates },
    lang,
  } = props;
  return (
    <div className={classes.about}>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={imageURL.concat('?fit=crop&h=500')} alt={capital} />
      </div>
      <div className={classes.widgets}>
        <Widgets lang={lang} country={{ currency, timezone, coordinates }} />
      </div>
      <div className={classes.descContainer}>
        <h2 className="title">{`${countryName}, ${capital}`}</h2>
        <p className={classes.desc}>{desc}</p>
      </div>
    </div>
  );
}

export default About;
