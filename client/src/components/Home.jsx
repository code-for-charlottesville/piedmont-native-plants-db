import React from 'react'
import {Link} from 'react-router-dom'

export const Home =()=>{
    return (
        <div class="home_intro">
            <h2>
                Welcome to the Piedmont Natives - Plant Database!
            </h2>
            <hr></hr>
            <p>
                Based on available science, the plants recommended here were found in this region prior to the arrival of the colonists at Jamestown, thus making them native plants. Native plants are historic to the region, help give us a sense of place, and are an important part of our local ecosystem. A panel of local experts chose these plants based on their current or potential availability, their overall aesthetic interest, and their likelihood to grow well without major care. This database allows everyone from the development community to the backyard enthusiast to search for native plants by uses and growing conditions.
            </p>
            <hr></hr>
            <p>
                <strong>Disclaimer: </strong>
                The information contained within this database was compiled from a variety of sources by County staff working with local plant experts and is subject to unannounced additions and updates. Please email us with any comments or suggestions regarding the data or problems with the functionality of this site.
            </p>
            <hr></hr>
            <Link to='/Search'>
                Search
            </Link>
        </div>
    )
}

