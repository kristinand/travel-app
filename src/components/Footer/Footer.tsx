import React from 'react';
import classes from './Footer.module.scss';
import { githubProfiles } from '../../utils/constants';

const Footer = () => (
  <footer className={classes.footerWrapper}>
    <div className={classes.footer}>
      <span>Created by: </span>
      {githubProfiles.map((profile) => (
        <a href={`https://github.com/${profile}`} target="_blank" rel="noreferrer">
          @
          {profile}
        </a>
      ))}
      <a className={classes.course} href="https://rs.school/js/" target="_blank" rel="noreferrer">
        <img className={classes.courseImage} src="https://rs.school/images/rs_school_js.svg" alt="rsschhol" />
        <span>/2021</span>
      </a>
    </div>
  </footer>
);

export default Footer;
