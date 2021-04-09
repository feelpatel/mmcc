
import {
    ImageSlider,
    CustomSolution,
    Offering,
    OurService,
    CustomMadeBlock,
    BackgroundImageSlice,
    UpcomingEvents,
    VideoBlock,
    ImageGallery,
    RegisterModal
} from "./";

const SliceZone = ({videoModalRef,sliceZone}) =>{
    return (
        <>
        {
            sliceZone.map((value,index)=>{
                console.log(value.slice_type,index);
                switch(value.slice_type){
                    case ('full_width_image'):
                        return <BackgroundImageSlice slice={value} key={`slice-${index}`} ></BackgroundImageSlice>
                        break;
                    case ('owlslider'):
                        return <ImageSlider videoModalRef={videoModalRef} slice={value}  key={`slice-${index}`} ></ImageSlider>
                        break;
                    case ('custom_solution'):
                        return <CustomSolution slice={value}  key={`slice-${index}`} ></CustomSolution>
                        break;
                    case ('offering'):
                        return <Offering slice={value}  key={`slice-${index}`} ></Offering>
                        break;
                    case ('our_service'):
                        return <OurService slice={value}  key={`slice-${index}`} ></OurService>
                        break;
                    case ('custom_made_block'):
                        return <CustomMadeBlock slice={value}  key={`slice-${index}`} ></CustomMadeBlock>  
                         break;
                    case ('upcoming_events'):
                        return <UpcomingEvents slice={value} key={`slice-${index}`} ></UpcomingEvents>       
                        break;  
                    case ('video_block'):
                        return <VideoBlock slice={value} key={`slice-${index}`} ></VideoBlock>
                        break;  
                    case ('image_gallery'):
                        return <ImageGallery slice={value} key={`slice-${index}`} ></ImageGallery>
                        break;
                    case ('register'):
                        return <RegisterModal slice={value} key={`slice-${index}`} ></RegisterModal>
                        break;   
                    default:
                        return null
                }
                
            })
        }
        </>
    )
}

export default SliceZone