/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import classes from './Auth.module.scss';
import Airplane from '../../components/Airplane/Airplane';
import { Api } from '../../api/api';
import { setUserData } from '../../redux/actions/actions';
import { IState } from '../../redux/reducers/reducerTypes';

function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const lang = useSelector((state: IState) => state.lang);
  const [photo, setPhoto] = useState('');
  const [photoData, setPhotoData] = useState<File>();
  const [serverErrors, setServerErrors] = useState<string>('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const validationSchema = Yup.object({
    name: Yup.string().required(t('name-rule')),
    email: Yup.string().email('Please, enter a valid email').required('Email is required'),
    password: Yup.mixed()
      .required('Password is required')
      .test('serverErr', serverErrors, () => {
        setServerErrors('');
        return serverErrors === '';
      }),
    photo: Yup.mixed()
      .test(
        'fileFormat',
        t('photo-only'),
        // eslint-disable-next-line comma-dangle
        () => photoData === undefined || photoData.type.match(/^image\/\w*$/) !== null
      )
      .test('fileFormat', t('photo-size'), () => photoData === undefined || photoData.size / 1024 / 1024 <= 1),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      photo: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });

  const onSubmitHandler = async (data: { email: string; password: string; photo?: string; name: string }) => {
    try {
      const res = await Api.signup(JSON.stringify(data));
      localStorage.setItem('userData', JSON.stringify(res.data));
      dispatch(setUserData(res.data));
      history.replace('/');
    } catch (err) {
      setServerErrors(err.response.data.errors.map((error: any) => error.msg).join('/r/n'));
    }
  };

  const onPhotoLoadHandler = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement & EventTarget;
    if (files && files.length) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoBase = typeof reader.result === 'string' ? reader.result : '';
        setPhoto(photoBase);
        setPhotoData(files[0]);
        formik.setFieldValue('photo', photoBase);
      };
      reader.readAsDataURL(files[0]);
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
        <form className={[classes.form, classes.signup].join(' ')} onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            name="name"
            placeholder={t('name')}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            type="email"
            name="email"
            placeholder={t('email')}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type="password"
            name="password"
            placeholder={t('pass')}
            value={formik.values.password}
            inputProps={{ min: 0 }}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <div className={classes.uploadBtn}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={onPhotoLoadHandler}
              />
              <Button variant="outlined" component="span">
                {t('photo-load')}
              </Button>
              {photo && <img src={photo} width="50" alt="" title={t('photo-your')} />}
              <p className={classes.helperText}>{formik.errors.photo}</p>
            </label>
          </div>
          <Button type="submit">{t('confirm')}</Button>
        </form>
        <p>
          {t('have-acc')}{' '}
          <Link to="/login">
            <span className={classes.linkText}>{t('enter')}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
