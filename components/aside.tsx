"use client"

import styles from './aside.module.css'


interface DarkMode{
    darkMode: Boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Aside(props: DarkMode) {

    let changeMode = () => props.setDarkMode(mode => !mode)
    // controll mode changing
    console.log(`Dark Mode ${props.darkMode}`)
    
    return (
        <>
            <div className={styles.aside}>
                <button onClick={changeMode}>Dark/Light</button>
            </div>
        </>
    )
}