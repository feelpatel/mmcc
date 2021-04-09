
import { RichText } from 'prismic-reactjs';

const NewsLetterWidget = ({ slice }) => {
    
    return (
        <div className="col-lg-3">
            {/* <div className="footer-widget text-center">
                <span className="h4">{RichText.asText(slice.primary.newsletter)}</span>
                <div className="widget-body">
                    <p className="font13">{RichText.asText(slice.primary.newsletter_desc)}</p>
                    <form>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Enter your email" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button className="btn input-action" type="button" id="button-addon2"><i className="bx bx-chevron-right" /></button>
                        </div>
                    </form>
                </div>
            </div> */}
            <div className="footer-widget text-center">
                <span className="h4">{RichText.asText(slice.primary.follow_us)}</span>
                <div className="widget-body">
                    <div className="social-list">
                        {
                            slice.items.map((value, index) => {
                                return (
                                    <a key={`news-letter-slice-${index}`}  href="#">
                                        <img height={25} width={25} src={value.followus.url} alt={value.followus.alt} />
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsLetterWidget
