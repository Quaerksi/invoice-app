// Context/LoginContext
import React, {useEffect, useState, createContext } from "react";

interface ThemeProviderProps{
    children: React.ReactNode
}

export const FilterContext = createContext({filterMode: 'all', setFilterMode: (filterMode: string) => {}});

export const FilterProvider = ({ children }: ThemeProviderProps) => {  

     const [filterMode, setFilterMode] = useState<string>('all')

    return (
      <FilterContext.Provider value={{ filterMode, setFilterMode }}>
        {children}
      </FilterContext.Provider>
    );
}