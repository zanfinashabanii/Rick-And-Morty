
import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const Footer = () => {
  const { toggleLanguage } = useContext(LanguageContext);

  return (
    <footer>
      <label htmlFor="language-select">Select Language: </label>
      <select
        id="language-select"
        onChange={toggleLanguage} 
      >
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
      
    </footer>
  );
};

export default Footer;
