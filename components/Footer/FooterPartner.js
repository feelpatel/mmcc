import { RichText } from 'prismic-reactjs';

const FooterPartnersWidget = ({ slice }) => {

    return (
        <div className="col-lg-3">
            <div className="footer-widget text-center">
                <span className="h4">{RichText.asText(slice.primary.partner_label)}</span>
                <div className="widget-body">
                    <div className="brand-list">
                        {
                            slice.items.map((value, index) => {
                                return (
                                    <div key={`footer-partner-slice-${index}`} className="brand-list-child">
                                        <img src={value.partner_images.url} className="img-fluid" alt={value.partner_images.alt} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterPartnersWidget