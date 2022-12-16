"use client"

import styles from './aside.module.css'

// Context theme
import { useThemeContext } from '../app/useThemeContext'

export default function Aside() {

    const {themeMode, setThemeMode} = useThemeContext();

    let changeMode = () => {themeMode === 'light' ? setThemeMode('dark') : setThemeMode('light')}


    // controll mode changing 
    return (
        <>
            <div className={styles.aside}>
                <button onClick={changeMode}>Dark/Light</button>
            </div>
        </>
    )
}