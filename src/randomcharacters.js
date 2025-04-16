import { useQuery, gql } from '@apollo/client';
import { useState, useEffect, useContext } from 'react';
import './App.css';
import { LanguageContext } from './LanguageContext';

export const GET_SINGLE_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      species
      status
      type
      gender
      origin { name }
      location { name }
      image
    }
  }
`;

export const RandomCharacter = () => {
  const [randomId, setRandomId] = useState(() => Math.floor(Math.random() * 826) + 1);
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language] || translations.en; // Fallback to 'en' if language is undefined

  const { loading, error, data } = useQuery(GET_SINGLE_CHARACTER, {
    variables: { id: randomId },
  });

  useEffect(() => {
    setRandomId(Math.floor(Math.random() * 826) + 1);
  }, []);

  return (
    <div>
      <p className="intro">
        {t.noCharacterFound}
        <br />
        <br />
        {t.suggestRandom}
      </p>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {error && <p>{t.error}</p>}

      {data && (
        <div
          className="card"
          key={data.character.name}
          style={{
            backgroundImage: `url(${data.character.image})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="info">
            <h2 className="h3">{data.character.name}</h2>
            <p>
              {t.status}: {data.character.status}
            </p>
            <p>
              {t.species}: {data.character.species}
            </p>
            <p>
              {t.type}: {data.character.type || t.none}
            </p>
            <p>
              {t.gender}: {data.character.gender}
            </p>
            <p>
              {t.origin}: {data.character.origin.name}
            </p>
            <p>
              {t.location}: {data.character.location.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
