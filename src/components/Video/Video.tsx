import React, { useRef, useEffect } from 'react';
import classes from './Video.module.scss';

interface Props {
  videoURL: string;
  country: string;
}

const Video = ({ videoURL, country }: Props) => {
  const videoRef = useRef() as React.MutableRefObject<HTMLIFrameElement>;

  const updateSize = () => {
    const video = videoRef.current;
    if (video) {
      video.height = ((video.offsetWidth * 9) / 16).toString();
    }
  };

  useEffect(() => {
    updateSize();
  }, []);

  window.addEventListener('resize', updateSize);

  return (
    <div className={classes.Video}>
      <iframe
        ref={videoRef}
        title={country}
        width="1366"
        height="768"
        src={`https://www.youtube.com/embed/${videoURL}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Video;
