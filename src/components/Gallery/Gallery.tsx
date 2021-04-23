import React from 'react';
import ImageGallery from 'react-image-gallery';
import AttractionsRating from '../../containers/AttractionsRating/AttractionsRating';
import classes from './Gallery.module.scss';
import { IAttractions } from '../../redux/reducers/reducerTypes';

interface Props {
  attractions: IAttractions[];
  title: string;
}

const Gallery = (props: Props) => {
  const { attractions, title } = props;

  const myRenderItem = (item: { original: string; description: string; originalTitle: string; id: string }) => (
    <div className={classes.galleryContainer}>
      <img className={classes.galleryImage} src={item.original} alt="img" />
      <div className={classes.galleryTitle}>{item.originalTitle}</div>
      <div className={classes.galleryDescription}>{item.description}</div>
      <AttractionsRating id={item.id} />
    </div>
  );

  const images = attractions.map((attr) => ({
    original: `${attr.imageURL}?fit=crop&w=1200`,
    thumbnail: `${attr.imageURL}?fit=crop&w=100`,
    description: attr.desc,
    originalTitle: attr.name,
    // eslint-disable-next-line no-underscore-dangle
    id: attr._id,
    renderItem: myRenderItem,
  }));

  return (
    <div id="gallery" className={classes.gallery}>
      <a href="#gallery" className={classes.title}>{title}</a>
      <ImageGallery items={images} />
    </div>
  );
};

export default Gallery;
