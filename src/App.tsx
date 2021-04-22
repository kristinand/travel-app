import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './css/App.scss';
import './styles/app.global.scss';
import { setCountriesThunk } from './redux/thunk/thunk';
import { IState } from './redux/reducers/reducerTypes';
import Main from './containers/Main/Main';
import Country from './containers/Country/Country';
import Signup from './containers/Auth/Signup';
import Login from './containers/Auth/Login';

const App = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: IState) => state.lang);

  useEffect(() => {
    dispatch(setCountriesThunk());
  }, [lang, dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/join" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/:ISOCode" component={Country} />
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
