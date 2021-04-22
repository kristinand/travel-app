import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem } from '@material-ui/core';
import { setLang } from '../../redux/actions/actions';
import { IState } from '../../redux/reducers/reducerTypes';

interface IOptions {
  value: string;
  label: string;
}

const options: IOptions[] = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
  { value: 'de', label: 'DE' },
];

const LanguageSelect = () => {
  const lang = useSelector((state: IState) => state.lang);
  const [selectedLang, setSelectedLang] = useState(options.find((opt) => opt.value === lang)!.value);

  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const onSelectLanguageHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    const language = event.target.value as string;
    if (language !== null) {
      dispatch(setLang(language));
      i18n.changeLanguage(language);
      setSelectedLang(language);
    }
  };

  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedLang}
      onChange={onSelectLanguageHandler}
    >
      <MenuItem value={options[0].value}>{options[0].label}</MenuItem>
      <MenuItem value={options[1].value}>{options[1].label}</MenuItem>
      <MenuItem value={options[2].value}>{options[2].label}</MenuItem>
    </Select>
  );
};

export default LanguageSelect;
