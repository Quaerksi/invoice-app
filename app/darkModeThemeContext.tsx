import React from 'react';

interface DarkMode{
    // possible values: dark | light
    themeMode: String
}

export const DarkModeThemeContext = React.createContext<String>(`light`);