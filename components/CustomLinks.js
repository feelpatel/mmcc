import React,{useRef} from 'react'
import ContactUs from './ContactUs'
import {hrefResolver} from '../prismic-configuration'
import {default as NextLink} from 'next/link'
import {RichText} from 'prismic-reactjs'

const CustomLinks = ({item,classNames}) => {
    const contactRef = useRef();
    
    return (
        <>
          {
                (item.link.type == "contactus") 
                ? 
                    <>
                        <ContactUs ref={contactRef} ></ContactUs>  
                        <span onClick={() => contactRef.current.openContactUsModal()} className={classNames}><RichText render={item.button_label} /></span>  
                    </>                                   
                : 
                    <>
                        {console.log(item.link," item ",item.button_label)}
                        <NextLink href={hrefResolver(item.link)} passHref ><a className={classNames}><RichText render={item.button_label} /></a></NextLink>
                    </> 
            }  
        </>
    )
}

export default CustomLinks