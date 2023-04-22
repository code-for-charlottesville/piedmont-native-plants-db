import React from "react";
import plants_bg from '../assets/plants_bg.jpeg';

const NativePlantsStyle = {
  ellipse: {
   
  },
  welcometext: {
  }
}

export default function PlantDatabasePage() {
  return (
    <div className="flex flex-col items-stretch bg-white min-h-screen">
      <div className="flex flex-col flex-1  text-center bg-grey-light  contrast-[.85] px-4 py-2 m-2 text-[#FFFFFF]"
        style=
        {{
          backgroundImage: `url(${plants_bg})`, backgroundSize:"100%"
        }}>
        <div className="flex flex-1 text-center  px-4 py-2">
          <div className="flex-1 self-end" >Ellipse logo</div></div>
        <div className="flex-5  text-center text-[14px] text-[#818181] font-black">Welcome to the</div>
        <div className="flex-4  text-center  px-4 py-2 m-2 text-[48px] font-medium">Piedmont Native Plants Database</div>
        <div className="flex-3  text-center  px-4 py-2 m-2">

          <div>

            <form className="flex flex-row justify-evenly m-[auto] w-[75%]" >
              <div className="m-3 flex flex-col flex-[0_0_40%] self-start" >
                <label htmlFor="searchfor" className="font-bold text-[12px] text-left  mb-2 text-sm font-medium  dark:text-white">Search for</label>
                <input type="text" id="searchfor"  className="w-[100%] rounded p-2 w-full" placeholder="Enter your search query..." required />
              </div>
              <div className="m-3 flex-[0_0_20%] flex flex-col self-start">
                <label htmlFor="nativeto" className="font-bold text-[12px] text-left  mb-2 text-sm font-medium dark:text-white">Native To</label>
                <select id="nativeto" className="rounded w-full  border border-gray-300 p-2  dark:text-black" placeholder="Select location">
                  <option value="default">{"Select location"}</option>
                </select>
              </div>
              <div className="m-3 flex-[0_0_20%] flex flex-col self-start">
                <label htmlFor="category"  className="font-bold text-[12px] text-left mb-2 text-sm font-medium dark:text-white">Category</label>
                <select id="category" className="rounded w-full  border border-gray-300 p-2  dark:text-black" placeholder="Select category">
                  <option value="default">{"Select category"}</option>
                </select>
              </div>
              <div className="flex m-3 flex-[0_0_20%] self-end">
                <button type="submit" className="bg-[#FF9900] text-[16px] text-[#FEFEFE] font-medium text-white w-full px-2 focus:ring-4 focus:outline-none font-medium rounded-lg  text-center ">Search Database</button></div>
            </form>

          </div>
        </div>
        <div className="flex-1 flex flex-row  text-center bg-grey-light px-4 py-2 m-2 justify-center">
          <div className="w-half underline px-2 font-medium text-[16px]" >Advanced search</div>
          <div className="w-half underline px-2 font-medium text-[16px]" >Clear all filters</div>
        </div>
      </div>
      <div className="flex-1 flex flex-row text-center bg-grey-light px-4 py-2 m-2 justify-center items-start " >
     <div  className="max-w-[40%] flex flex-col p-3 mx-2 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.15)]">
      <div  className="text-[32px] font-medium">Add a new plant</div>
      <div className="font-medium text-[16px]">Lorem ipsum dolor sitcvbcvb amet consectetur. Amet laoreet id molestie a sed ipsum malesuada risus. Non ipsum arcu nisi nunc.
          
      </div>
      <div className="w-fit p-3 self-end"><button type="submit" className="bg-[#FF9900] text-[16px] text-[#FEFEFE] w-full px-5 py-2 focus:ring-4 focus:outline-none font-medium rounded-lg  text-center ">Submit</button></div>
       
     </div>
     <div  className="max-w-[40%] flex flex-col p-3 mx-2 shadow-[0_12px_35px_-15px_rgba(0,0,0,0.15)]">
     <div className="text-[32px] font-medium">Edit a database entry</div>
     <div className="font-medium text-[16px]">Lorem ipsum dolor sit amet consectetur. Amet laoreet id molestie a sed ipsum malesuada risus. Non ipsum arcu nisi nunc.
        
    </div>
    <div className="w-fit p-3 self-end "><button type="submit" className="bg-[#FF9900] text-[16px] text-[#FEFEFE] w-full px-5 py-2 focus:ring-4 focus:outline-none font-medium rounded-lg  text-center ">Submit</button></div>
       
     </div>
      </div>




    </div>
  );
}
