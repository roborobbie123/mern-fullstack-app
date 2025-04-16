import React from "react";


export default function PlaceItem({ id, image, title, description, address, creator, location }) {
    const buttonStyle = 'border px-1 rounded-sm shadow-xl hover:bg-gray-100 cursor-pointer'

    return(
        <li className='my-5 border-3 w-1/2 h-3/5 bg-white text-center rounded-md'>
            <div><img src={image} className='w-full h-75 rounded-md' /></div>
            <div className='p-2'>
                <h2 className='text-2xl font-semibold my-1'>{title}</h2>
                <h3 className='font-semibold my-1'>{address}</h3>
                <p className='my-1'>{description}</p> 
            </div>
            <div className='flex gap-2 justify-center mb-8 mt-4 text-sm'>
                <button className={buttonStyle}>VIEW ON MAP</button>
                <button className={buttonStyle}>EDIT</button>
                <button className={buttonStyle}>DELETE</button>
            </div>
        </li>
    );
}