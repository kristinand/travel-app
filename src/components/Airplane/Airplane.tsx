/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, useState } from 'react';
import classes from './Airplane.module.scss';
import planeImg from '../../assets/img/plane.png';
import { getRandomNumber } from '../../utils/functions';

function Airplane() {
  const planesRef = useRef<HTMLDivElement | null>(null);
  let reqId: number;
  const [planes, setPlanes] = useState<HTMLCollection | []>([]);

  useEffect(() => {
    setPlanes(planesRef.current!.children);
  }, []);

  useEffect(() => {
    for (let i = 0; i < planes.length; i++) {
      initPlaneStyleParams(planes[i] as HTMLImageElement, planes[i].id);
    }
    animate();
    return () => {
      window.cancelAnimationFrame(reqId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planes]);

  const animate = () => {
    reqId = window.requestAnimationFrame(animate);
    for (let i = 0; i < planes.length; i++) {
      animatePlane(planes[i] as HTMLImageElement);
    }
  };

  const animatePlane = (plane: HTMLImageElement) => {
    const windowWidth = window.innerWidth;
    const planeParams = plane.getBoundingClientRect();
    const speed = {
      x: planeParams.width / 25,
      y: (-1 * planeParams.width) / 80,
    };

    if (
      planeParams.x > -2 * planeParams.width
      && planeParams.x <= windowWidth
      && planeParams.y > -2 * planeParams.height
    ) {
      const newHorPositionValue = (plane.id === 'left' ? planeParams.left : windowWidth - planeParams.right) + speed.x;
      const dir = plane.id;
      (plane.style as { [key: string]: any })[dir] = `${newHorPositionValue}px`;
      plane.style.top = `${planeParams.top + speed.y}px`;
    } else {
      initPlaneStyleParams(plane, plane.id);
    }
  };

  const initPlaneStyleParams = (plane: HTMLImageElement, dir: string) => {
    const planeWidth = getRandomNumber(5, 30);
    plane.style.width = `${planeWidth}vw`;
    (plane.style as { [key: string]: any })[dir] = `${-1 * planeWidth}vw`;
    plane.style.top = `${getRandomNumber(20, 100)}vh`;
  };

  return (
    <div ref={planesRef}>
      <img id="left" className={classes.airplaneLeft} src={planeImg} alt="plane" />
      <img id="right" className={classes.airplaneRight} src={planeImg} alt="plane" />
    </div>
  );
}

export default Airplane;
