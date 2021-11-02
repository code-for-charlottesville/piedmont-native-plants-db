import React from 'react'

const description = "Flowers attract bumblebees, butterflies, hummingbirds. Native Columbines host 12 species of native caterpillars."
const explaination = "After an initial burst of blooms in the spring,it may produce occasional blooms in the summer. In the right conditions will self-seed readily.Semi-evergreen."

const flowerObject = {
    latin_name:"Aquilegia canadensis",
    english_name:"Wild Columbine",
    img_source:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.applewoodseed.com%2Fwp-content%2Fuploads%2F2016%2F11%2FAQCN-701.jpg&f=1&nofb=1",
    description:description,
    info:{
        "height":"1-2ft",
        "Bloom Color":"Red and yellow",
        "Bloom Date": "Mar - May",
        "Soil":"Adaptable, rocky; pH moderate-base",
        "Natural Habitat": "Forests, outcrops",
    },
    explaination:explaination

}

export const InfoCard =(props)=>{
    return (
        <div className="card layered-shadow">
            <h1>{flowerObject.latin_name} | {flowerObject.english_name}</h1>
            <div className="card-content">
                <div className="left">
                    <img className="flower-img" alt="flower" src={flowerObject.img_source}></img>
                    <p>Description:</p>
                    <p>{flowerObject.description}</p>
                </div>
                <div className="right">
                    <h2>Information</h2>
                    <ol>
                        {Object.keys(flowerObject.info).map((item,key)=>(
                            <li key={key}>{item}: {Object.values(flowerObject.info)[key]}</li>
                        ))}
                    </ol>
                    <p>{flowerObject.explaination}</p>
                </div>
            </div>
            <div className="edit-btns-group">
                <div className="moreInfo-btn">More Info</div>
                <div className="download-btn">Download</div>
                <div className="edit-btn">Edit</div>
                <div className="delete-btn">Delete</div>
            </div>
        </div>
    )
}