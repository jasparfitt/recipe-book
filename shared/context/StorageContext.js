import React from 'react';

const StorageContext = React.createContext({
  getItem: async () => null, 
  setItem: async () => null,
});

export default StorageContext;