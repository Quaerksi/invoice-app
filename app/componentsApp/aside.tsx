"use client"

import styles from './aside.module.css'
import Image from 'next/image'

// Context theme
import { useThemeContext } from '../../context/useThemeContext'

export default function Aside() {

    const {themeMode, setThemeMode} = useThemeContext();

    let changeMode = () => {themeMode === 'light' ? setThemeMode('dark') : setThemeMode('light')}

    return (
        <>
            <div className={`${styles.aside} ${styles.order}`}>
            
                <div className={`${styles.logo}`}>
                    <div className={`${styles.logoTop}`}></div>
                    <Image
                        className={`${styles.circle}`}
                        src="/assets/logo.svg"
                        alt="Picture of the user"
                        width={28}
                        height={28}
                    />
                </div>
                <div className={`${styles.interactiveBlock}`}>
                    {themeMode === 'light' ?
                    <Image
                        className={`${styles.themeToggle}`}
                        onClick={changeMode}
                        src="/assets/icon-moon.svg"
                        alt="Button switch theme dark to light and back"
                        width={30}
                        height={30}
                        priority={true}
                    /> 
                    :
                    <Image
                        className={`${styles.themeToggle}`}
                        onClick={changeMode}
                        src="/assets/icon-sun.svg"
                        alt="Button switch theme dark to light and back"
                        width={30}
                        height={30}
                    />
                }
                    <div className={`${styles.separation}`}></div>
                    <Image
                        className={`${styles.avatar}`}
                        src="/assets/image-avatar.jpg"
                        alt="Picture of the user"
                        width={30}
                        height={30}
                    />
                </div>
            </div>
        </>
    )
}