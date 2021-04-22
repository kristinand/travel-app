import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
import classes from './Header.module.scss';
import logo from '../../assets/img/logo.svg';
import userImg from '../../assets/img/user.png';
import { IState } from '../../redux/reducers/reducerTypes';
import { changeSearchThunk, logoutThunk } from '../../redux/thunk/thunk';
import { setUserData } from '../../redux/actions/actions';
import LanguageSelect from './LanguageSelect';

interface IHeader {
  inputVisible: boolean;
}

const Header = ({ inputVisible }: IHeader) => {
  const userData = useSelector((state: IState) => state.userData);
  const searchValue = useSelector((state: IState) => state.searchValue);

  const dispatch = useDispatch();

  useEffect(() => {
    const localUserData = localStorage.getItem('userData');
    if (localUserData) {
      dispatch(setUserData(JSON.parse(localUserData)));
    }
  }, [dispatch]);
  const { t } = useTranslation();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchThunk(e.target.value));
  };

  const handleKeyPressInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(changeSearchThunk(searchValue));
    }
  };

  const logout = () => {
    dispatch(logoutThunk());
  };

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logoLink}>
        <img className={classes.logo} src={logo} alt="logo" />
      </Link>

      {inputVisible && (
        <Input
          className={classes.search}
          type="search"
          placeholder={t('search')}
          value={searchValue}
          onChange={handleChangeInput}
          onKeyPress={handleKeyPressInput}
          inputProps={{ 'aria-label': 'description' }}
        />
      )}

      <LanguageSelect />

      {userData.name ? (
        <>
          <img
            className={classes.userImage}
            src={userData.photo || userImg}
            alt={userData.name}
            title={userData.name}
          />
          <Button className={classes.loginBtn} onClick={logout}>
            {t('exit')}
          </Button>
        </>
      ) : (
        <Link style={{ textDecoration: 'none' }} to="/login">
          <Button className={classes.loginBtn}>{t('enter')}</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
