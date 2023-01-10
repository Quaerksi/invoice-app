"use client"

import '../styles/globals.css'
import styles from './dropdownDefault.module.css'
import Image from 'next/image' 
import { useEffect, useRef } from 'react'

// Context theme
import { useThemeContext } from '../context/useThemeContext'

interface dropdownValues {
    name: string,
    elements: string[],
    defaultValue: string
}

export default function DropdownDefault({name, elements, defaultValue="Next 1 Day"}: dropdownValues)  {
    const refDropdown = useRef<HTMLDivElement>(null);
    const refDropdownMenu = useRef<HTMLUListElement>(null)
    const refInput = useRef<HTMLInputElement>(null);

    const {themeMode} = useThemeContext();

        // handle dropbdown font color on theme switch
        useEffect(() => {

            let letRefDropdownMenu = refDropdownMenu.current

            if(letRefDropdownMenu){
                for(let i = 0; i < letRefDropdownMenu.children.length; i++){
                    let thisElement = letRefDropdownMenu.children[i].children
                    if(themeMode === 'light' && thisElement){
                        thisElement[0].setAttribute('style',`color:${getComputedStyle(document.documentElement).getPropertyValue('--color-black')};`)
                    } else if (themeMode === 'dark' && thisElement){
                        thisElement[0].setAttribute('style',`color:${getComputedStyle(document.documentElement).getPropertyValue('--color-white')};`)
                    }  
                }
                letRefDropdownMenu.style.display = 'none'
            }
          }, [themeMode])

   

    // open and close dropdown menu with display='block' ||'none
    // handle border color dropdown-label
    let openDropdownMenu = (e:React.MouseEvent<HTMLElement>)=>{
        
        let letRefDropdownMenu = refDropdownMenu.current
        let letRefDropdown = refDropdown.current

        if(letRefDropdownMenu && letRefDropdown){

            if(letRefDropdownMenu.style.display === 'none' || letRefDropdownMenu.style.display === ''){

                letRefDropdownMenu.style.display = 'block'
                letRefDropdown.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-form-active')

            }else if(letRefDropdownMenu.style.display === 'block'){

                letRefDropdownMenu.style.display = 'none'
                letRefDropdown.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-form-border')
            }
        } 
    }

    // handle border color dropdown-label on mouse enter
    let openDropdownMenuBorderColorOnEnter = (e:React.MouseEvent<HTMLElement>) => {

        let letRefDropdown = refDropdown.current

        if(letRefDropdown){
            letRefDropdown.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-form-active')
        }
    }

    // handle border color dropdown-label on mouse leave
    let openDropdownMenuBorderColorOnLeave = (e:React.MouseEvent<HTMLElement>) => {
        
        let letRefDropdown = refDropdown.current
        let letRefDropdownMenu = refDropdownMenu.current

        if(letRefDropdown && letRefDropdownMenu){

            if(letRefDropdownMenu.style.display != 'block') {
                letRefDropdown.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-form-border')
            }
           
        }
    }

    let handleDropdownMethod = (e:React.MouseEvent<HTMLElement>) => {

        let target = e.currentTarget
        let letRefDropdown = refDropdown.current
        let letRefDropdownMenu = refDropdownMenu.current
        let input = refInput.current

        if(letRefDropdown && letRefDropdown.firstElementChild && target.firstElementChild && letRefDropdownMenu && input){
            input.value = `${target.firstElementChild.textContent || ''}`;
            
            letRefDropdown.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color-form-border')
            letRefDropdownMenu.style.display = 'none';
        }
    }

    // color Text on hover Dropdown
    let dropdownColorTextOnEnter = (e:React.MouseEvent<HTMLElement>) => {
        let target = e.currentTarget 

        if(target && target.firstElementChild){

            let targetChild = target.firstElementChild as HTMLSpanElement
            targetChild.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-form-active')
            // targetChild.style.color = 'var(--color-form-active);'
        }
    }

    // uncolor Text on hover Dropdown
    let dropdownColorTextOnLeave = (e:React.MouseEvent<HTMLElement>) => {
        let target = e.currentTarget 

        if(target && target.firstElementChild){

            let targetChild = target.firstElementChild as HTMLSpanElement
            targetChild.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-form-font');
            // targetChild.style.color = 'var(--color-form-font);'
        }
    }

    //handle list elements name
    const typedArray:React.ReactElement[] = elements.map((name, index, arr) => <li key={`dropdown-${index}`} onClick={handleDropdownMethod} onMouseEnter={dropdownColorTextOnEnter} onMouseLeave={dropdownColorTextOnLeave}><span>{name}</span></li>)
    
    return <div>
                <div className={`${styles.dropdown}`} >
                    <label htmlFor='dropdown'>{name}:</label>
                    
                    <div ref={refDropdown} className={`${styles.dropdownLabel}`} onClick={openDropdownMenu} onMouseEnter={openDropdownMenuBorderColorOnEnter} onMouseLeave={openDropdownMenuBorderColorOnLeave}>
                        <input ref={refInput} className={`${styles.inputValue}`} value={`${defaultValue}`} readOnly></input>
                        <Image
                            src="/assets/icon-arrow-down.svg"
                            alt="arrow down symbol"
                            height={7}
                            width={11}
                            priority={true}
                        />
                    </div>
                    <ul ref={refDropdownMenu} className={`${styles.dropdownContent}`}>
                        {
                            typedArray
                        }
                    </ul>
                </div>
            </div>
}