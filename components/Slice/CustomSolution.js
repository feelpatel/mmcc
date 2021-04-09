import { RichText } from 'prismic-reactjs';
import { useRouter } from "next/router";
import CustomLinks from '../CustomLinks';

const CustomSolution = ({ slice }) => {
    const router = useRouter();
    const isHomePage = (router.pathname == '/' || router.pathname == 'home_page') ? 'sec-intro':'sec-gap';
    return (
        <section className={isHomePage}>
            <div className="container">
                <div className="box view-1 bg-white text-center">
                    <div className="row g-5">
                        <div className="col-md-7">
                            <div className="head">
                                <RichText
                                    render={slice.primary.custom_solution_heading}
                                />
                                <div className="diamond-strip"><span /></div>
                            </div>
                            <div>
                                <RichText render={slice.primary.custom_solution_desc} />
                            </div>
                            <div className="step-view">
                                {
                                    slice.items.map((item, index) => (
                                        <CustomSteps item={item} key={`CustomSteps-${index}`}></CustomSteps>
                                    ))
                                }                                
                            </div>
                            {
                                (slice.primary.button_label != '') 
                                && 
                                <>
                                    <CustomLinks item={slice.primary} classNames={"btn btn-min btn-1 primary mt-2"}></CustomLinks>   
                                    {/* <NextLink href={hrefResolver(slice.primary.link)} passHref ><a className="btn btn-min btn-1 primary mt-2"><RichText render={slice.primary.button_label} /></a></NextLink> */}
                                </>
                            }                            
                        </div>
                        <div className="col-md-5 hide-md">
                            <div className="frame1">
                                <img src={slice.primary.custom_solution_heading_image.url} alt={slice.primary.custom_solution_heading_image.alt} className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const CustomSteps = ({item}) =>{
    return (
        <>
            <div className="step-child">
                <span>
                    <RichText render={item.custom_solution_step_label} />
                </span>
                <CustomLinks item={item}></CustomLinks>   
                {/* {
                    (item.link.type == "contactus") 
                    ? 
                        <>
                            <ContactUs ref={contactRef} ></ContactUs>  
                            <span onClick={() => contactRef.current.openContactUsModal()} className=""><RichText render={item.button_label} /></span>  
                        </>                                   
                    : 
                        <>                            
                            <NextLink href={hrefResolver(item.link)} passHref ><a className=""><RichText render={item.button_label} /></a></NextLink>
                        </> 
                } */}
            </div>
        </>
    )
}

export default CustomSolution