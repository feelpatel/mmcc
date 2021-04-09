import React,{useState} from 'react'
import { RichText } from 'prismic-reactjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs } from 'swiper';

SwiperCore.use([Thumbs])
const ImageGallery = ({ slice }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    return (
        <section className="sec-banner">
            <div className="equal-h main-banner">            
            <Swiper
            onSwiper={setThumbsSwiper}
            watchSlidesVisibility
            watchSlidesProgress           
            >
                {slice.items.map((item, index) => (
                    <SwiperSlide key={`imageSlide-${index}`} ><ImageGalleryItems item={item}  /></SwiperSlide>
                ))}
            </Swiper>
            <Swiper 
            spaceBetween={10}                      
            slidesPerView= {10}
            touchRatio= "0.2"
            slideToClickedSlide= {true}
            loop= {true}
            loopedSlides="0" 
            thumbs={{ swiper: thumbsSwiper }} >
                {slice.items.map((item, index) => (
                    <SwiperSlide key={`imageSlide-${index}`} ><ImageGalleryThumbItems item={item}  /></SwiperSlide>
                ))}
            </Swiper>
            </div>
        </section>    
    )
}

const ImageGalleryItems = ({item}) =>{
    console.log(item)
    return(      
        <div className="item">
            <img src={item.images.url} alt={item.images.alt} />
            <div className="cover">
                <div className="container">
                    <div className="header-content">
                        <div className="row g-5">
                            <div className="col-md-9">
                                <div className="banner-down">
                                    
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ImageGalleryThumbItems = ({item}) =>{
    console.log(item)
    return(
        <>
            <img src={item.images.thumbnail.url} alt={item.images.thumbnail.alt} width={item.images.thumbnail.dimensions.width} />
        </>
    )
}

export default ImageGallery