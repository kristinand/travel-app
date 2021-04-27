/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
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

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [serverErrors, setServerErrors] = useState<string>('');
  const lang = useSelector((state: IState) => state.lang);

  const { t, i18n } = useTranslation();

  const validationSchema = Yup.object({
    email: Yup.string().email('Please, enter a valid email').required('Email is required'),
    password: Yup.mixed()
      .required('Password is required')
      .test('serverErr', serverErrors, () => {
        setServerErrors('');
        return serverErrors === '';
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmitHandler(values);
    },
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const onSubmitHandler = async (data: { email: string; password: string }) => {
    try {
      const res = await Api.login(JSON.stringify(data));
      localStorage.setItem('userData', JSON.stringify(res.data));
      dispatch(setUserData(res.data));
      history.replace('/');
    } catch (err) {
      setServerErrors(err.response.data.errors.map((error: any) => error.msg).join('/r/n'));
    }
  };

  return (
    <div className={classes.wrapper}>
      <Airplane />
      <div className={classes.formContainer}>
        <Button className={classes.backBtn} onClick={() => history.push('/')}>
          {t('back-to-main')}
        </Button>
        <h2>{t('login')}</h2>
        <form className={[classes.form, classes.login].join(' ')} onSubmit={formik.handleSubmit}>
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
          <Button type="submit">{t('confirm')}</Button>
        </form>
        <p>
          {t('no-acc')}{' '}
          <Link to="/join">
            <span className={classes.linkText}>{t('sign-up')}</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
