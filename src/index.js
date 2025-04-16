
import ReactDOM from 'react-dom/client';
import React, { createContext, useState } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { LanguageProvider } from './LanguageContext'; // Import LanguageProvider


const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ApolloProvider>
);

reportWebVitals();
