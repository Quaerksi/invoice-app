import {useContext} from 'react'
import { FilterContext } from './filterContext'

export const useFilterContext = () => {

  return useContext(FilterContext)
}