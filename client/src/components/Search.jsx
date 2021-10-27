import React, { useState } from 'react'
import { InfoCard } from './InfoCard'
import { searchOptionsObject } from '../elements/searchOptionsObject'

export const Search=()=>{
    const[searchResults, setSearchResults] = useState([])
    const[advSearchItems, setAdvSearchItems] = useState([])
    const[advancedSearch, toggleAdvancedSearch]= useState(false)
    const _handleAdvanced=()=>{
        document.getElementById("advanced-search").classList.remove('advanced-search-hidden')
        document.getElementById("advanced-search").classList.add('advanced-search')
        
    }
    const _handleSearch=(event)=>{
        event.preventDefault()
        let results = [1,1,1,1,1,1,1,1,1,1]
        setSearchResults(results)
        document.getElementById("advanced-search").classList.add('advanced-search-hidden')
        document.getElementById("advanced-search").classList.remove('advanced-search')
    }
    const _handleClear=()=>{
        setSearchResults([])
        setAdvSearchItems([])
    }
    const _handleCheck=(search_crit)=>{
        if (document.getElementById(search_crit).classList.value === "checkbox_label") {
            document.getElementById(search_crit).classList.remove('checkbox_label')
            document.getElementById(search_crit).classList.add('checkbox_label_checked')
            setAdvSearchItems([...advSearchItems,search_crit])
        }else {
            document.getElementById(search_crit).classList.add('checkbox_label')
            document.getElementById(search_crit).classList.remove('checkbox_label_checked')
        }
        
    }
    return (
        <div class="search-form">
            <div>
                <h2>Search for Plants</h2>
            </div>
            <form>
                <div class="search-field">
                    <label for="search">Plant Search</label>
                    <input type="text" name="search" className="search">
                    </input>
                    <input type="submit" className="search-btn" value="Search" onClick={(e)=>_handleSearch(e)}></input>
                </div>
                <div class="search-btns">
                    <div className="search-btn" onClick={()=>_handleAdvanced()}>Advanced Search</div>
                    <div className="search-btn" onClick={()=>_handleClear()}>Clear Search</div>
                </div>
                {advSearchItems.length ? <h3>Advanced Search Criteria</h3> : null}
                <div className="adv-search-criteria-list">
                    {advSearchItems.length ? advSearchItems.map((item, key)=>(
                        <div className="adv-search-criteria-item">{item.toLocaleUpperCase()}<span className="cancel">X</span></div>
                    )):null}
                </div>
                <div className="advanced-search-hidden" id="advanced-search" hidden={true}>
                    <h3>Advanced Options</h3>
                    <fieldset className="checkbox-container">
                        <legend>Region</legend>
                        {searchOptionsObject.region.map((region, key)=>(
                            <div key={key}>
                                <input className="hidden-check" type="checkbox" id={{region}+`check`} name="area" value={region}></input>
                                <label 
                                    id={region} 
                                    className="checkbox_label" 
                                    for={region}
                                    onClick={()=>_handleCheck(region)}>{region.toLocaleUpperCase()}
                                </label>
                                
                            </div>
                        ))}
                    </fieldset>
                </div>
            </form>
            <div className="results">
                {searchResults ? searchResults.map((plant, key)=>(
                    <InfoCard/>
                )):null}
            </div>
        </div>
    )
}