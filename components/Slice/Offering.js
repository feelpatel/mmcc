import { RichText } from 'prismic-reactjs';

const Offering = ({ slice }) => {
    return (
        <section className="sec-gap d-bg bg-t sec-min-h">
            <img src={slice.primary.offering_image.url} alt={slice.primary.offering_image.alt} className="d-bg-img" />
            <div className="container">
                <div className="row justify-content-center text-center">
                    <div className="col-xl-7 col-lg-8">
                        <div className="head">
                            <RichText
                                render={slice.primary.offer_heading}
                            />
                            <div className="diamond-strip">
                                <span></span>
                            </div>
                        </div>
                        <RichText render={slice.primary.offering_desc} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Offering