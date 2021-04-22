import React, { useState, useEffect } from "react";
import classes from "./Auth.module.scss";
import { Link, useHistory } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import { Api } from "../../api/api";
import Airplane from "../Airplane/Airplane";
import validation from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/actions/actions";
import { useTranslation } from 'react-i18next';
import { IState } from "../../redux/reducers/reducerTypes";


const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>([]);
  const { email, password } = formData;
  const lang = useSelector((state: IState) => state.lang);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();
    try {
      let res = await Api.login(JSON.stringify(formData));
      localStorage.setItem("userData", JSON.stringify(res.data));
      dispatch(setUserData(res.data));
      history.goBack();
    } catch (err) {
      setErrors(err.response.data.errors.map((err: any) => err.msg));
    }
  };

  const onChangeHandler = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrors([]);
  };

  return (
    <div className={classes.wrapper}>
      <Airplane />
      <div className={classes.formContainer}>
        <Button className={classes.backBtn} onClick={() => history.push("/")}>
          {t("back-to-main")}
        </Button>
        <h2>{t('login')}</h2>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input type="email" name="email" placeholder={t("email")} value={email}
            onChange={(e) => {
              onChangeHandler(e);
              validation(e, 'email', t('email-rule'))
            }}
          />
          <Input
            type="password"
            name="password"
            placeholder={t("pass")}
            value={password}
            inputProps={{ min: 0 }}
            onChange={(e) => {
              onChangeHandler(e);
              validation(e, 'pass', t("pass-rule"))
            }}
          />
          {errors.length > 0 && <p className={classes.helperText}>{errors.join("\r\n")}</p>}
          <Button type="submit"> {t("confirm")}</Button>
        </form>
        <p className={classes.text}>
          {t("no-acc")} <Link to="/join">{t("sign-up")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
