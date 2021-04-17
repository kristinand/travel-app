import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './css/App.scss';
import { useDispatch, useSelector } from 'react-redux';
import Main from './pages/Main';
import Countries from './pages/Countries';
import { setCountriesThunk } from './redux/thunk/thunk';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import { IState } from './redux/reducers/reducerTypes';

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
        <Route path="/countries/:ISOCode" component={Countries} />
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
