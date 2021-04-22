import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CountriesList.module.scss';
import { ICountry } from '../../redux/reducers/reducerTypes';

interface Props {
  countries: ICountry[];
  title: string;
}

const CountryCard = (props: Props) => {
  const { countries, title } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.countries}>
        {countries.map((country) => (
          <Link to={`/${country.ISOCode}`}>
            <div className="country-card">
              <img className="card-img" src={`${country.imageURL}?fit=crop&w=500`} alt={country.country} />
              <span className="card-text">{country.country}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryCard;
