import React, { useState } from 'react'
import { InfoCard } from './InfoCard'
import { searchOptionsObject } from '../elements/searchOptionsObject'

export const Search=()=>{
    const[searchResults, setSearchResults] = useState([])
    const[advSearchItems, setAdvSearchItems] = useState([])
    const[advancedSearch, toggleAdvancedSearch]= useState(false)
    const _handleAdvanced=()=>{
        advancedSearch ? toggleAdvancedSearch(false) : toggleAdvancedSearch(true)
    }
    const _handleSearch=(event)=>{
        event.preventDefault()
        let results = [1,1,1,1,1,1,1,1,1,1]
        setSearchResults(results)
    }
    const _handleClear=()=>{
        setSearchResults([])
    }
    const _handleCheck=(search_crit)=>{
        document.getElementById(search_crit).classList.remove('checkbox_label')
        document.getElementById(search_crit).classList.add('checkbox_label_checked')
        setAdvSearchItems([...advSearchItems,search_crit])
    }
    return (
        <div class="search-form">
            <div>
                <h2>Search for Plants</h2>
            </div>
            <form>
                <div class="search-field">
                    <label for="search">Plant Search</label>
                    <input type="text" name="search" class="search">
                    </input>
                    <input type="submit" class="search-btn" value="Search" onClick={(e)=>_handleSearch(e)}></input>
                </div>
                <div class="search-btns">
                    <div class="search-btn" onClick={()=>_handleAdvanced()}>Advanced Search</div>
                    <div class="search-btn" onClick={()=>_handleClear()}>Clear Search</div>
                </div>
                {advSearchItems.length ? <h3>Search Criteria</h3> : null}
                {advSearchItems.length ? advSearchItems.map((item, key)=>(
                    <div>{item}</div>
                )):null}
                {advancedSearch ? <div class="advanced-seach">
                    <h3>Advanced Options</h3>
                    <fieldset class="checkbox-container">
                        <legend>Region</legend>
                        {searchOptionsObject.region.map((region, key)=>(
                            <div key={key}>
                                <input class="hidden-check" type="checkbox" id={{region}+`check`} name="area" value={region}></input>
                                <label id={region} class="checkbox_label" for={region}onClick={()=>_handleCheck(region)}>{region.toLocaleUpperCase()}</label>
                            </div>
                        ))}
                    </fieldset>
                </div>
                :null
                }
            </form>
            <div class="results">
                {searchResults ? searchResults.map((plant, key)=>(
                    <InfoCard/>
                )):null}
            </div>
        </div>
    )
}