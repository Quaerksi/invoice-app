"use client"

import '../styles/globals.css'
import styles from './dropdownDefault.module.css'
import React, {useRef} from 'react'
import Image from 'next/image' 
import type { AppProps } from 'next/app'

interface dropdownValues {
    name: string,
    elements: string[]
}

// React.ReactElement[]

export default function DropdownDefault({name, elements}: dropdownValues)  {

    const refDropdown = useRef<HTMLDivElement>(null);
    const refDropdownMenu = useRef<HTMLUListElement>(null)

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

        if(letRefDropdown && letRefDropdown.firstElementChild && target.firstElementChild && letRefDropdownMenu){
            letRefDropdown.firstElementChild.textContent = target.firstElementChild.textContent
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
        }
    }

    // uncolor Text on hover Dropdown
    let dropdownColorTextOnLeave = (e:React.MouseEvent<HTMLElement>) => {
        let target = e.currentTarget 

        if(target && target.firstElementChild){

            let targetChild = target.firstElementChild as HTMLSpanElement
            targetChild.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-form-font');
        }
    }

    //handle list elements name
    const typedArray:React.ReactElement[] = elements.map(name => <li onClick={handleDropdownMethod} onMouseEnter={dropdownColorTextOnEnter} onMouseLeave={dropdownColorTextOnLeave}><span> {name} </span></li>)
    
    return <div>
                <h3>Dropdown Default</h3>
                <div className={`${styles.dropdown}`}>
                    {name}
                    <div ref={refDropdown} className={`${styles.dropdownLabel}`} onClick={openDropdownMenu} onMouseEnter={openDropdownMenuBorderColorOnEnter} onMouseLeave={openDropdownMenuBorderColorOnLeave}>
                        <span> Next 1 Day </span>
                        <Image
                            src="/assets/icon-arrow-down.svg"
                            alt="arrow down symbol"
                            height={7}
                            width={11}
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