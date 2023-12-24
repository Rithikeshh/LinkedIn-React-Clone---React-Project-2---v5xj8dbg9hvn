import React, { createContext, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';

const SearchContext = createContext();

function SearchProvider({children}) {
    const [searchParms, setSearchParms] = useSearchParams()
    let field;
    for(const key of searchParms.keys()){
        field = key;
    }
    const [searchTerm, setSearchTerm] = React.useState(field ? searchParms.get(field) : "");
    const [searchField, setSearchField] = React.useState(field ? field : 'content');
  return (
    <SearchContext.Provider value={{searchField, searchTerm, setSearchField, setSearchTerm}}>
        {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider

export function useSearch(){
    return useContext(SearchContext);
}