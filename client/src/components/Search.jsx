import React, { useState } from 'react'
import { InfoCard } from './InfoCard'

export const Search=()=>{
    const[searchResults, setSearchResults] = useState([])
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
                {advancedSearch ? <div class="advanced-seach">
                    <h3>Advanced Options</h3>
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