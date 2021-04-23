import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Rate from 'rc-rate/es';
import classes from './AttractionsRating.module.scss';
import 'rc-rate/assets/index.css';
import { Api } from '../../api/api';
import { calculateRating, nameRateArray } from '../../utils/functions';
import { IState } from '../../redux/reducers/reducerTypes';

interface Props {
  id: string;
}
interface nameRate {
  name: string;
  rate: number;
}

const StarRating = ({ id }: Props) => {
  const [starsValue, setStarsValue] = useState(0);
  const [ratings, setRatings] = useState<nameRate[]>([]);
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
  }, [id]);

  const onClickChangeRate = (rating: number) => {
    if (userName) {
      Api.setRating(id, userName, rating).then((r) => setStarsValue(calculateRating(r.data)));
    }
  };

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
      <div className={classes.otherRatings}>
        {ratings.map((item) => (
          <div key={item.name} className={classes.personRating}>
            {item.name}
            <Rate count={5} value={item.rate} disabled />
          </div>
        ))}
      </div>
    </>
  );
};

export default StarRating;
