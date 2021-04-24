/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import classes from './Auth.module.scss';
import Airplane from '../../components/Airplane/Airplane';
import { Api } from '../../api/api';
import { setUserData } from '../../redux/actions/actions';
import { IState } from '../../redux/reducers/reducerTypes';

function Signup() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    photo: '',
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ photo: string; password: any; name: string; server: string[] | null }>({
    photo: '',
    password: '',
    name: '',
    server: null,
  });
  const lang = useSelector((state: IState) => state.lang);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const dispatch = useDispatch();

  const { email, password, name, photo } = formData;

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    if (!errors.password && !errors.photo) {
      setErrors({ ...errors, server: null });
      try {
        const res = await Api.signup(JSON.stringify(formData));
        localStorage.setItem('userData', JSON.stringify(res.data));
        dispatch(setUserData(res.data));
        history.push('/');
      } catch (err) {
        setErrors({ ...errors, server: err.response.data.errors.map((error: any) => error.msg) });
      }
    }
  };

  const onChangeHandler = (target: HTMLInputElement) => {
    const { name: key, value } = target;
    setFormData({ ...formData, [key]: value });

    if (key === 'password' && value.length < 6) {
      setErrors({
        ...errors,
        [key]: t('pass-rule'),
      });
    } else if (key === 'name' && value.length < 1) {
      setErrors({
        ...errors,
        [key]: t('name-rule'),
      });
    } else {
      setErrors({ ...errors, password: '' });
    }
  };

  const onPhotoLoadHandler = (files: FileList) => {
    const file = files[0];

    if (file === undefined || !file.type.match(/^image\/\w*$/)) {
      setErrors({ ...errors, photo: t('photo-only') });
    } else if (file.size / 1024 / 1024 > 1) {
      setErrors({ ...errors, photo: t('photo-size') });
    } else {
      setErrors({ ...errors, photo: '' });

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData({ ...formData, photo: reader.result });
        } else {
          setFormData({ ...formData, photo: '' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Airplane />
      <div className={classes.formContainer}>
        <Button className={classes.backBtn} onClick={() => history.push('/')}>
          {t('back-to-main')}
        </Button>
        <h2>{t('sign-up')}</h2>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input
            type="text"
            name="name"
            placeholder={t('name')}
            value={name}
            onChange={(e) => onChangeHandler(e.target as HTMLInputElement)}
          />

          <Input
            type="email"
            name="email"
            placeholder={t('email')}
            value={email}
            onChange={(e) => {
              onChangeHandler(e.target as HTMLInputElement);
            }}
          />
          <Input
            type="password"
            name="password"
            placeholder={t('pass')}
            value={password}
            onChange={(e) => {
              onChangeHandler(e.target as HTMLInputElement);
            }}
          />
          <div className={classes.uploadBtn}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => onPhotoLoadHandler(e.target.files as FileList)}
              />
              <Button variant="outlined" component="span">
                {t('photo-load')}
              </Button>
              {photo && <img src={photo} width="50" alt="" title={t('photo-your')} />}
            </label>
          </div>
          {(errors.password || errors.server || errors.photo) && isFormSubmitted && (
            <p className={classes.helperText}>{Object.values(errors).join('\r\n').trim()}</p>
          )}
          <Button type="submit">{t('confirm')}</Button>
        </form>
        <p className={classes.text}>
          {t('have-acc')} <Link to="/login">{t('enter')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
