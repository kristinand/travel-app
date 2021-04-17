import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Rate from 'rc-rate/es';
import { useTranslation } from 'react-i18next';
import { Api } from '../api/api';
import { calculateRating, nameRateArray } from '../utils/functions';
import 'rc-rate/assets/index.css';
import { IState } from '../redux/reducers/reducerTypes';

interface Rating {
  id: string;
}
interface nameRate {
  name: string;
  rate: number;
}

export const StarRating = ({ id }: Rating) => {
  const [starsValue, setStarsValue] = useState(0);
  const [array, setArray] = useState<nameRate[]>([]);
  const [isToggled, setIsToggled] = useState(false);
  const { t } = useTranslation();
  const userName = useSelector((state: IState) => state.userData.name);

  useEffect(() => {
    Api.getRating(id).then((r) => {
      setStarsValue(calculateRating(r.data));
    });
  }, [id]);

  useEffect(() => {
    Api.getRating(id).then((r) => {
      setArray(nameRateArray(r.data));
    });
  }, [id, isToggled]);

  const onClickChangeRate = (rating: number) => {
    if (userName === '') return;
    Api.setRating(id, userName, rating).then((r) => setStarsValue(calculateRating(r.data)));
  };
  const [style, setStyle] = useState({ display: 'none' });
  const toggle = (act: string) => {
    act === 'over' ? setStyle({ display: 'flex' }) : setStyle({ display: 'none' });
    setIsToggled((prev) => !prev);
  };

  return (
    <>
      <div className={'star-rating'}>
        <Rate
          count={5}
          key={1}
          value={starsValue}
          allowHalf={true}
          onChange={(rating) => onClickChangeRate(rating)}
          style={{ fontSize: '30px', outline: 'none', border: 'none' }}
        />
      </div>
      <button className="show-star" onMouseOver={() => toggle('over')} onMouseOut={() => toggle('out')}>
        {t('allStars')}
      </button>
      <div className="show-star_other" style={style}>
        {array.map((item, index) => {
          return (
            <div key={index} className="show-star_other_item">
              <p>{item.name}</p>
              <Rate
                count={5}
                value={item.rate}
                style={{ fontSize: '20px', outline: 'none', border: 'none' }}
                disabled={true}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
