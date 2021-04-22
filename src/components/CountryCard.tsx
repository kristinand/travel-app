import React from 'react';
import { Link } from 'react-router-dom';
import { ICountry } from '../redux/reducers/reducerTypes';

interface ICountryCardProps {
  data: ICountry;
}

const CountryCard = ({ data }: ICountryCardProps) => {
  const { country, imageURL, ISOCode } = data;

  return (
    <Link to={`/${ISOCode}`}>
      <div className="country-card">
        <img className="card-img" src={`${imageURL}?fit=crop&w=500`} alt={country} />
        <span className="card-text">{country}</span>
      </div>
    </Link>
  );
};

export default CountryCard;
