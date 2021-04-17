import { IRatingResponse } from '../api/api';

export const calculateRating = (array: IRatingResponse[]) => {
  const ratingsArray = array.map((obj) => obj.rating);
  const reduce = ratingsArray.reduce((sum, current) => sum + current, 0);
  return +(reduce / ratingsArray.length).toFixed(1);
};

export const nameRateArray = (array: IRatingResponse[]) => {
  const nameRate = array.map((obj) => ({
    name: obj.userName,
    rate: obj.rating,
  }));
  return nameRate.filter(({ name }) => name !== undefined);
};

export const getRandomNumber = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
