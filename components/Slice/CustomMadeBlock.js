import {useRef} from 'react'
import { RichText } from 'prismic-reactjs';
import CustomLinks from '../CustomLinks'

const CustomMadeBlock = ({ slice }) => {
    
    return (
        <>
            {      
                slice.items.map((item, index) => (                    
                    <CustomMadeBlockItem key={`custom-${index}`} reverseClass={(index % 2 == 0)  ? 'flex-md-row-reverse': '' } item={item} ></CustomMadeBlockItem>             
                ))     
            }
        </> 
    )
    
}

const CustomMadeBlockItem = ({item,reverseClass}) =>{
    const contactRef = useRef();
    return (
        <>
            <section className="bg-primary sec-half">
                <div className={`row g-0 ${reverseClass}`}>
                    <div className="col-md-6">
                        <div className="sec-half-media">
                            <img src={item.custom_made_block_image.url} alt={item.custom_made_block_image.alt} className="img" />
                        </div>
                    </div>
                    <div className="col-md-6 align-self-center">
                        <div className="box sec-half-caption">
                            <div className="head text-center">
                                <RichText render={item.heading_label} /> 
                                <div className="diamond-strip"><span /></div>
                                <RichText render={item.heading_desc} /> 
                                <CustomLinks item={item} classNames={"btn btn-min btn-1 white mt-2"}></CustomLinks>  
                                {/* {
                                    (item.link.type == "contactus") 
                                    ? 
                                        <>
                                            <ContactUs ref={contactRef} ></ContactUs>  
                                            <span onClick={() => contactRef.current.openContactUsModal()} className="btn btn-min btn-1 white mt-2"><RichText render={item.button_label} /></span>  
                                        </>                                   
                                    : 
                                        <>                                          
                                            <NextLink href={hrefResolver(item.link)} passHref ><a className="btn btn-min btn-1 white mt-2"><RichText render={item.button_label} /></a></NextLink>
                                        </> 
                                }   */}                              
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CustomMadeBlock