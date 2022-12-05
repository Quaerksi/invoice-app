"use client"

import styles from './aside.module.css'


interface DarkMode{
    // possible values: dark | light
    themeMode: String
    setThemeMode: React.Dispatch<React.SetStateAction<string>>
}

export default function Aside(props: DarkMode) {

    let changeMode = () => props.setThemeMode(mode => mode === 'light' ? 'dark' : 'light') 
    // controll mode changing
    console.log(`Dark Mode ${props.themeMode}`)
    
    return (
        <>
            <div className={styles.aside}>
                <button onClick={changeMode}>Dark/Light</button>
            </div>
        </>
    )
}