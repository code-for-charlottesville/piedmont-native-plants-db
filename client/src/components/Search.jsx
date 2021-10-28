import React, { useState } from 'react'
import { InfoCard } from './InfoCard'
import { searchOptionsObject } from '../elements/searchOptionsObject'

export const Search=()=>{
    const[searchResults, setSearchResults] = useState([])
    const[advSearchItems, setAdvSearchItems] = useState([])
    const[advancedSearch, toggleAdvancedSearch]= useState(false)

    const removeSearchCriteria =(criteria)=>{
        let position = advSearchItems.indexOf(criteria)
        let reducedArray = [...advSearchItems]
        reducedArray.splice(position,1)
        setAdvSearchItems(reducedArray)
    }

    const _handleAdvanced=()=>{
        document.getElementById("advanced-search").classList.remove('advanced-search-hidden')
        document.getElementById("advanced-search").classList.add('advanced-search')
        
    }
    const _handleHideAdvanced=()=>{
        document.getElementById("advanced-search").classList.add('advanced-search-hidden')
        document.getElementById("advanced-search").classList.remove('advanced-search')
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
            document.getElementById(search_crit+"check").checked = true
            setAdvSearchItems([...advSearchItems,search_crit])
        }else {
            document.getElementById(search_crit).classList.add('checkbox_label')
            document.getElementById(search_crit).classList.remove('checkbox_label_checked')
            document.getElementById(search_crit+"check").checked = false
            removeSearchCriteria(search_crit)
        }
        
    }
    const _handleRemoveSearchCriteria=(search_crit)=>{
        console.log(document.getElementById(search_crit+"check").checked)
        document.getElementById(search_crit+"check").checked = false
        removeSearchCriteria(search_crit)
        document.getElementById(search_crit).classList.add('checkbox_label')
        document.getElementById(search_crit).classList.remove('checkbox_label_checked')
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
                <div className="search-btns">
                    <div className="search-btn" onClick={()=>_handleAdvanced()}>Advanced Search</div>
                    <div className="search-btn" onClick={()=>_handleClear()}>Clear Search</div>
                </div>
                {advSearchItems.length ? <h3>Advanced Search Criteria</h3> : null}
                <div className="adv-search-criteria-list">
                    {advSearchItems.length ? advSearchItems.map((item, key)=>(
                        <div className="adv-search-criteria-item" key={key}>{item.toLocaleUpperCase()}<span className="cancel" onClick={()=>_handleRemoveSearchCriteria(item)}>X</span></div>
                    )):null}
                </div>
                <div className="advanced-search-hidden" id="advanced-search" hidden={true}>
                    <h3>Advanced Options</h3>
                        {Object.keys(searchOptionsObject).map((entry,key)=>(
                            <fieldset key={key} className="checkbox-container">
                                {console.log(entry)}
                                <legend>{entry.toUpperCase()}</legend>
                                {searchOptionsObject[entry].map((entry, key)=>(
                                    <div key={key}>
                                        <input className="hidden-check" type="checkbox" id={entry+`check`} name="area" value={entry}></input>
                                        <label 
                                            id={entry} 
                                            className="checkbox_label" 
                                            for={entry}
                                            onClick={()=>_handleCheck(entry)}>{entry.toLocaleUpperCase()}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        ))}
                    <div className="hide-btn" onClick={()=>_handleHideAdvanced()}>Hide</div>
                </div>
            </form>
            <div className="results">
                {searchResults ? searchResults.map((plant, key)=>(
                    <InfoCard plant={plant} key={key}/>
                )):null}
            </div>
        </div>
    )
}