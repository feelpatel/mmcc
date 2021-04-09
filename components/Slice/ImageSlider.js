import {useRef} from 'react'
import { RichText } from 'prismic-reactjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import {FancyBox} from './FancyBox'
import { default as NextLink } from 'next/link';
import { hrefResolver } from '../../prismic-configuration';
import ContactUs from '../ContactUs'
import CustomLinks from '../CustomLinks';

SwiperCore.use([Autoplay])
const ImageSlider = ({ videoModalRef, slice }) => {
    const params = {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView:1,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        autoplayDisableOnInteraction:false
      }     
    }
    return (
        <section className="sec-banner">
            <div className="owl-theme owl-action-1 equal-h main-banner">
                <Swiper {...params}>
                    {slice.items.map((item, index) => (
                        <SwiperSlide key={`imageSlide-${index}`} ><ImageSliderItems videoModalRef={videoModalRef} item={item}  /></SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            <div className="labs">
                <div className="labs-child"><img src="images/lab-chicago.png" alt="chicago" className="img-fluid" /></div>
                <div className="labs-child"><img src="images/lab-guarantee.png" alt="guarantee" className="img-fluid" /></div>
                <a href="#" className="labs-child"><img src="images/lab-app-download.png" alt="download" className="img-fluid" /></a>
            </div>
            
        </section>    
    )
}

const ImageSliderItems = ({videoModalRef,item}) =>{
    const contactRef = useRef();
    return(      
        <div className="item">
            <img src={item.images.url} alt={item.images.alt} />
            <div className="cover">
                <div className="container">
                    <div className="header-content">
                        <div className="row g-5">
                            <div className="col-md-9">
                                <div className="banner-down">
                                     <RichText
                                        render={item.title}
                                    />
                                    {/* <span className="h2 ff1">{RichText.asText(item.title)}</span>
                                    <h1>{RichText.asText(item.title_one)}</h1> */}
                                </div>
                                <div className="banner-up">
                                    <p>{RichText.asText(item.desc)}</p>
                                    <div className="banner-action">
                                        <CustomLinks item={item} classNames={"btn btn-min btn-1 white mt-2"}></CustomLinks> 
                                        {/* {
                                            (item.link.type == "contactus") 
                                            ? 
                                                <>
                                                    <ContactUs ref={contactRef} ></ContactUs>  
                                                    <a href="#" onClick={() => contactRef.current.openContactUsModal()} className="btn btn-min btn-1 white mt-2"><RichText render={item.button_label} /></a>  
                                                </>                                   
                                            : <NextLink href={hrefResolver(item.link)} passHref ><a className="btn btn-min btn-1 white mt-2"><RichText render={item.button_label} /></a></NextLink> 
                                        } */}                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 hide-md d-flex justify-content-center align-items-center">                               
                                {/*<a onClick={()=>videoModalRef.current.openFancyBox('name')} className="btn-play zoomIn">
                                    <i className='bx bx-play'></i>
                                </a>   
                                 <FancyBox ref={videoModalRef} props={{caption:"How to Add Project In Master Casting and Cad Website | Chicago",
                                source:'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
                                defaultWidth:800,
                                defaultHeight:450}} >                                    
                                </FancyBox>   */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageSlider