import React from 'react';
import classes from './About.module.scss';

interface Props {
  imageURL: string;
  country: string;
  capital: string;
  desc: string;
}

function About(props: Props) {
  const { country, capital, desc, imageURL } = props;
  return (
    <div className={classes.about}>
      <div className={classes.descContainer}>
        <h2 className="title">{`${country}, ${capital}`}</h2>
        <p className={classes.desc}>{desc}</p>
      </div>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={imageURL.concat('?fit=crop&h=500')} alt={capital} />
      </div>
    </div>
  );
}

export default About;
