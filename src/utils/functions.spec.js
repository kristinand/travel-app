import { calculateRating, nameRateArray } from './functions';

const apiRatingResponse = [
  {
    _id: 'id',
    attraction: 'attaction',
    email: 'email',
    userName: 'username1',
    __v: 0,
    rating: 5,
  },
  {
    _id: 'id',
    attraction: 'zxc',
    email: 'email',
    userName: 'username2',
    __v: 0,
    rating: 3,
  },
  {
    _id: 'id',
    attraction: 'qwe',
    email: 'email',
    userName: 'username3',
    __v: 0,
    rating: 1,
  },
];

describe('calculate rating', () => {
  it('calculate rating return average sum of array.length', () => {
    expect(calculateRating(apiRatingResponse)).toBe(3);
  });
});

describe('name rating array', () => {
  it('array return name and rate', () => {
    expect(nameRateArray(apiRatingResponse)).toEqual([
      { name: 'username1', rate: 5 },
      { name: 'username2', rate: 3 },
      { name: 'username3', rate: 1 },
    ]);
  });
});
