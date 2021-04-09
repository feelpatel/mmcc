import {FancyBox} from './FancyBox'

const VideoBlock = ({ videoModalRef, slice }) => {
    {console.log(slice.primary.video_link,"slic ")}
    return (
        <section className="sec-video d-bg d-flex justify-content-center align-items-center bg-primary">
            <img src={slice.primary.images.url} alt={slice.primary.images.alt} className="d-bg-img op-5" />
            <FancyBox ref={videoModalRef} props={{caption:"",
            source:`${slice.primary.video_link.url}`,
            defaultWidth:800,
            defaultHeight:450}} openFancyBox={(data) => {
                console.log(' here openFancyBox ')
            }}></FancyBox>                              
            {/* <a onClick={()=>FancyBox.propTypes.openFancyBox('name')} className="btn-play zoomIn">
                <i className='bx bx-stop'></i>
            </a>  */}          
        </section>    
    )
}
export default VideoBlock