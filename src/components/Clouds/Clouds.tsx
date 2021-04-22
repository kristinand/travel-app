import React from 'react';
import classes from './Clouds.module.scss';
import clouds from '../../assets/img/clouds.png';

function Clouds() {
  return (
    <div>
      <div className={classes.bg} />
      <img className={[classes.clouds, classes.cloud1].join(' ')} src={clouds} alt="cloud" />
      <img className={[classes.clouds, classes.cloud2].join(' ')} src={clouds} alt="cloud" />
      <img className={[classes.clouds, classes.cloud3].join(' ')} src={clouds} alt="cloud" />
    </div>
  );
}

export default Clouds;
