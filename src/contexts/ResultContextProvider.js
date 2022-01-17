import React, { createContext, useState, useContext } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  /* ------- /search, /news, /images, /videos -------- */

  const getResults = async (type) => {
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}${type}`, {
        method: 'GET',
        headers: {
          'x-user-agent': 'desktop',
          'x-proxy-location': 'US',
          'x-rapidapi-host': 'google-search3.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        },
      });
      const data = await response.json();

      if (type.includes('/news')) {
        setResults(data.entries);
      } else if (type.includes('/images')) {
        setResults(data.image_results);
      } else {
        setResults(data.results);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, loading, searchTerm, setSearchTerm }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
