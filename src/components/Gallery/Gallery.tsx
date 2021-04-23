import React from 'react';
import ImageGallery from 'react-image-gallery';
import StarRating from './StarRating';
import classes from './Gallery.module.scss';
import { IAttractions } from '../../redux/reducers/reducerTypes';

interface Props {
  attractions: IAttractions[];
  title: string;
}

const Gallery = (props: Props) => {
  const { attractions, title } = props;

  const myRenderItem = (item: { original: string; description: string; originalTitle: string; id: string }) => (
    <div className="image-gallery-container">
      <img className="image-gallery-image" src={item.original} alt="img" />
      <StarRating id={item.id} />
      <span className="image-gallery-description">{item.description}</span>
      <p className="image-gallery-title">{item.originalTitle}</p>
    </div>
  );

  const images = attractions.map((attr) => ({
    original: `${attr.imageURL}?fit=crop&w=1000`,
    thumbnail: `${attr.imageURL}?fit=crop&w=100`,
    description: attr.desc,
    originalTitle: attr.name,
    // eslint-disable-next-line no-underscore-dangle
    id: attr._id,
    renderItem: myRenderItem,
  }));

  return (
    <div className={classes.gallery}>
      <h2 className={classes.title}>{title}</h2>
      <ImageGallery items={images} />
    </div>
  );
};

export default Gallery;
