import { RichText } from 'prismic-reactjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomLinks from '../CustomLinks'

const OurService = ({ slice }) => {
    return (
       <section className="sec-gap">
            <div className="sec-head">
                <div className="head text-center">
                    <RichText render={slice.primary.label} />
                    <div className="diamond-strip"><span ></span></div>
                </div>
            </div>
            <div className="sec-body">
                <div className="owl-theme owl-action-1 service-slider">
                    <Swiper
                    spaceBetween={15}
                    slidesPerView={2}                                        
                    >
                        {slice.items.map((item, index) => (
                            <SwiperSlide key={`SwiperSlide-${index}`} ><OurServiceItems item={item} /></SwiperSlide>
                        ))}
                    </Swiper>              
                </div>
            </div>
        </section>
    )
}

const OurServiceItems = ({item}) =>{
    return (
        <>
            <div className="item">
                <div className="service-box-child">
                    <div className="service-box-media ratio">
                        <img src={item.image.url} alt={item.image.alt} />
                    </div>
                    <div className="service-box-cation">
                        <RichText render={item.our_service_desc} />
                        <CustomLinks item={item}></CustomLinks>      
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurService