import React, {useState} from 'react';
const BackgroundImageSlice =({slice}) =>{
    return ( 
        <>          
            <section className="sec-gap">
                <div className="container">
                    <img src={slice.primary.image.url} alt={slice.primary.image.alt} className='mx-auto d-block' />                    
                </div>     
            </section>
        </>
    )
}

export default BackgroundImageSlice