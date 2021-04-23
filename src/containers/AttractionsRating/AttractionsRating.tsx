import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Rate from 'rc-rate/es';
import classNames from 'classnames/bind';
import classes from './AttractionsRating.module.scss';
import 'rc-rate/assets/index.css';
import { Api } from '../../api/api';
import { calculateRating, nameRateArray } from '../../utils/functions';
import { IState } from '../../redux/reducers/reducerTypes';

const cx = classNames.bind(classes);

interface Props {
  id: string;
}
interface nameRate {
  name: string;
  rate: number;
}

const StarRating = ({ id }: Props) => {
  const { t } = useTranslation();
  const [starsValue, setStarsValue] = useState(0);
  const [ratings, setRatings] = useState<nameRate[]>([]);
  const [isOtherVisible, setIsOtherVisible] = useState(false);
  const userName = useSelector((state: IState) => state.userData.name);

  useEffect(() => {
    Api.getRating(id).then((r) => {
      setStarsValue(calculateRating(r.data));
    });
  }, [id]);

  useEffect(() => {
    Api.getRating(id).then((r) => {
      setRatings(nameRateArray(r.data));
    });
  }, [id, isOtherVisible]);

  const onClickChangeRate = (rating: number) => {
    if (userName) {
      Api.setRating(id, userName, rating).then((r) => setStarsValue(calculateRating(r.data)));
    }
  };

  const toggleClicked = () => {
    setIsOtherVisible((prev) => !prev);
  };

  const otherClasses = cx({
    otherRatings: true,
    hidden: !isOtherVisible,
  });

  return (
    <>
      <Rate
        className={classes.rating}
        count={5}
        key={1}
        value={starsValue}
        allowHalf
        onChange={(rating) => onClickChangeRate(rating)}
      />
      <div className={classes.otherContainer}>
        <button className={classes.toggleBtn} onClick={toggleClicked} type="button">
          {t('allStars')}
        </button>
        <div className={otherClasses}>
          {ratings.map((item) => (
            <div key={item.name} className={classes.personRating}>
              {item.name}
              <Rate count={5} value={item.rate} disabled />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StarRating;
