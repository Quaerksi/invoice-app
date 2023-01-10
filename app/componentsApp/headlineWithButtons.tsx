"use client"

import design from '../../styles/designsystem.module.css'
import styles from './headlineWithButtons.module.css'

import React, { useRef, useEffect } from "react";

// Context
import { useThemeContext } from '../../context/useThemeContext'
import { useFilterContext } from '../../context/useFilterContext'

import Image from 'next/image'

interface Props {
    countInvoices: number;
  }

export default function Headline(prop: Props) {

    const count = prop.countInvoices

    /****************************************** Filter Checkbox Start ************************************************************/
    const checkBox = useRef<HTMLDivElement>(null);
    const {filterMode, setFilterMode} = useFilterContext();
    
    const {themeMode} = useThemeContext();

    // handle dropbdown font color on theme switch
    useEffect(() => {

        let letRefCheckBox = checkBox.current
        let allCheckboxParents = letRefCheckBox?.children;

        if(allCheckboxParents){
            for(let i = 0; i < allCheckboxParents.length; i++){
                let checkBox = allCheckboxParents[i].children[0] as HTMLDivElement
                
                if(checkBox){
                    // uncolor checkboxes
                    if(!checkBox.classList.toString().includes('checked')){
                        if(themeMode === 'light'){
                            checkBox.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-light-gray')
                        } else if (themeMode === 'dark'){
                            checkBox.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-gray-black')
                        }   
                    }
                }
            }
        }
      }, [themeMode])
    
    // color checkbox on hover
    let containerFilterOptionsLineOnMouseEnter = (e:React.MouseEvent<HTMLElement>) => {

        let targetElement = e.currentTarget.firstElementChild as HTMLDivElement;

        if(targetElement){
            // color checkbox border
            targetElement.style.border= `1px solid ${ getComputedStyle(document.documentElement).getPropertyValue('--color-dark-purple')}`
        }
    }

    // color checkbox on hover
    let containerFilterOptionsLineOnMouseLeave = (e:React.MouseEvent<HTMLElement>) => {

        let targetElement = e.currentTarget.firstElementChild as HTMLDivElement;

        if(targetElement){
            // uncolor checkbox border
            targetElement.style.border= 'none'
        }
    }

    // handle click on a filter option
    let containerFilterOptionsLineOnClick = (e:React.MouseEvent<HTMLElement>) => {

        let targetElement = e.currentTarget.firstElementChild as HTMLDivElement;
        let secondTargetElement = e.currentTarget.children[1] as HTMLSpanElement
        let letRefCheckBox = checkBox.current
        let allCheckboxParents = letRefCheckBox?.children;

        // is filter option clicked again so it has to be unactive
        let secondClick = false

        // send clicked filter option to context
        if(secondTargetElement){
            if(filterMode === secondTargetElement.innerText.toLocaleLowerCase()){
                setFilterMode('all')
                secondClick = true
            } else {
                let text = secondTargetElement.innerText.toLocaleLowerCase()
                setFilterMode(text)
            } 
        }  

        // uncheck all checkBoxes
        if(allCheckboxParents){
            for(let i = 0; i < allCheckboxParents.length; i++){
                let checkBox = allCheckboxParents[i].children
                
                if(checkBox){
                    // uncolor checkBoxes
                    checkBox[0].classList.remove('checked')
                    checkBox[0].setAttribute('style',`border = none;`)
                    checkBox[0].setAttribute('style',`background-color: ${ getComputedStyle(document.documentElement).getPropertyValue('--color-background-site')}`)                  
                }
            }
        }

        // check the cklicked filterBox
        if(targetElement && letRefCheckBox && !secondClick){
            targetElement.classList.add('checked')
            targetElement.style.border= `1px solid ${ getComputedStyle(document.documentElement).getPropertyValue('--color-dark-purple')}`
            // color checkbox background    
            targetElement.style.backgroundColor = `${ getComputedStyle(document.documentElement).getPropertyValue('--color-dark-purple')}`
        }
    }

    // button for filter box
    let filterButtonOnClick = (e:React.MouseEvent<HTMLElement>) => {

        if(checkBox.current?.style.display === 'none'){
            checkBox.current.style.display = 'block'
        } else if(checkBox.current?.style.display === 'block'){
            checkBox.current.style.display = 'none'
        }
    }

    /****************************************** Filter Checkbox End ************************************************************/

    // controll mode changing 
    return (
        <>
            <div className={`${styles.order}`}>
                <div>
                    <h1 className={`${styles.headline}`}>Invoices</h1>
                    <h3 className={`${styles.secondLine}`}><span>{count ? count : 0 }</span> invoices</h3>
                </div>
                <div className={`${styles.orderButton}`}>
                    <h3  onClick={filterButtonOnClick}>
                        <button className={`${design.btn} ${design.btn3Color} `}> 
                                <div className={` ${design.btn1} ${design.btnFlex} ${styles.btnWithArrow}`}>
                                    Filter
                                    {/* CheckBox */}
                                </div> 
                        </button>
                    </h3>
                    <div ref={checkBox} style={{display: 'none'}} className={`${styles.containerFilterOption}`}>
                        <div onClick={containerFilterOptionsLineOnClick} onMouseEnter={containerFilterOptionsLineOnMouseEnter} onMouseLeave={containerFilterOptionsLineOnMouseLeave} className={`${styles.containerFilterOptionsLine}`}>
                            <div className={`${styles.containerFilterOptionsCheckBox}`}></div>
                            <span className={`hallo ${styles.containerFilterOptionsName}`}>Draft</span>
                        </div>
                        <div  onClick={containerFilterOptionsLineOnClick} onMouseEnter={containerFilterOptionsLineOnMouseEnter} onMouseLeave={containerFilterOptionsLineOnMouseLeave} className={`${styles.containerFilterOptionsLine}`}>
                            <div  className={`${styles.containerFilterOptionsCheckBox}`}></div>
                            <span className={`hallo ${styles.containerFilterOptionsName}`}>Pending</span>
                        </div>
                        <div onClick={containerFilterOptionsLineOnClick} onMouseEnter={containerFilterOptionsLineOnMouseEnter} onMouseLeave={containerFilterOptionsLineOnMouseLeave} className={`${styles.containerFilterOptionsLine}`}>
                            <div className={`${styles.containerFilterOptionsCheckBox}`}></div>
                            <span className={`hallo ${styles.containerFilterOptionsName}`}>Paid</span>
                        </div>
                    </div>
                    <h3>
                        <div className={`${design.btn}  ${design.btnColor1}`}> 
                            <div className={` ${design.btn2} ${design.btnFlex}`}>
                                <div className={`${design.circle}`}>
                                    <div className={`${design.btnFlex}`}>+</div>
                                </div>
                                <div  className={`${design.text}`}>New</div>
                            </div>
                        </div>
                    </h3>
                </div>  
            </div>
        </>
    )
}