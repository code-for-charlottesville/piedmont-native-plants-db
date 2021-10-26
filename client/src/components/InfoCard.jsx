import React from 'react'

export const InfoCard =()=>{
    return (
        <div class="card">
            <div class="left">
                <h1>Card</h1>
                <img alt="flower"></img>
                <p>Description</p>
            </div>
            <div class="right">
                <h2>Data</h2>
                <ol>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                </ol>
            </div>
        </div>
    )
}