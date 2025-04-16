import { useQuery, gql } from '@apollo/client';
import { useState, useContext } from 'react';
import { RandomCharacter } from './randomcharacters';
import './App.css';
import { LanguageContext } from './LanguageContext';
import { translations } from './translations';

export const GET_CHARACTERS = gql`
  query Characters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      info {
        next
        prev
      }
      results {
        name
        status
        species
        gender
        origin { name }
        image
      }
    }
  }
`;

const sortCharacters = (characters, sortKey, sortOrder) => {
  return [...characters].sort((a, b) => {
    const valueA = a[sortKey]?.name || a[sortKey] || '';
    const valueB = b[sortKey]?.name || b[sortKey] || '';
    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

export function CharacterList() {
  const [filters, setFilters] = useState({ status: '', species: '' });
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);

  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      status: filters.status,
      species: filters.species,
    },
  });

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => prev + 1);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const allSpecies = [
    'Human', 'Alien', 'Humanoid', 'Robot', 'Animal', 'Mythological Creature',
    'Cronenberg', 'Disease', 'Poopybutthole', 'Vampire', 'unknown'
  ];

  return (
    <div className="character-container">
      <div className="filter-bar">
        <select value={filters.status} onChange={(e) => updateFilter('status', e.target.value)}>
          <option value="">All Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select value={filters.species} onChange={(e) => updateFilter('species', e.target.value)}>
          <option value="">All Species</option>
          {allSpecies.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="origin">Sort by Origin</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {error && <p>{t.error}</p>}
      {data?.characters.results.length === 0 && <RandomCharacter />}

      {data && (
        <>
          <div className="table-wrapper">
            <table className="character-table">
              <thead>
                <tr>
                  <th>{t.image}</th>
                  <th>{t.name}</th>
                  <th>{t.status}</th>
                  <th>{t.species}</th>
                  <th>{t.gender}</th>
                  <th>{t.origin}</th>
                </tr>
              </thead>
              <tbody>
                {sortCharacters(data.characters.results, sortKey, sortOrder).map((character) => (
                  <tr key={character.name}>
                    <td>
                      <img src={character.image} alt={character.name} className="char-img" />
                    </td>
                    <td>{character.name}</td>
                    <td>{character.status === 'unknown' ? 'Unknown' : character.status}</td>
                    <td>{character.species}</td>
                    <td>{character.gender}</td>
                    <td>{character.origin.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={handlePrev} disabled={!data.characters.info.prev}>
              ⬅ Prev
            </button>
            <span>Page {page}</span>
            <button onClick={handleNext} disabled={!data.characters.info.next}>
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
}
