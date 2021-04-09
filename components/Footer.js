import LinkWidget from './Footer/LinkWidget';
import NewsLetterWidget from './Footer/NewsLetterWidget';
import FooterPartnersWidget from './Footer/FooterPartner';
import PrismicScript from '../components/PrismicScript'

const Footer = ({ footer_widget }) => {
    const { body } = footer_widget.data;
    return (
        <>
            <div className="bg-light">
                <div className="footer-top">
                    <div className="container">
                        <div className="row g-0">
                            {body.map((slice, index) => {
                                switch (slice.slice_type) {
                                    case ('widget'):
                                        return <LinkWidget slice={slice} key={`footer-slice-${index}`}></LinkWidget>
                                    case ('newsletter'):
                                        return <NewsLetterWidget slice={slice} key={`footer-slice-${index}`} />
                                    case ('partners'):
                                        return <FooterPartnersWidget slice={slice} key={`footer-slice-${index}`} />
                                    default:
                                        return null
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="footer-bottom text-center py-4">
                    <p className="mb-1"> Copyright © , <a href="#" target="_blank">Master Casting &amp; Cad.</a> All rights reserved.</p>
                </div>
            </div>
        </>
    )
}

export default Footer