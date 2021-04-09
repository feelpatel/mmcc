import React, {useState} from 'react'
import SubMenu from '../Submenu';
import { RichText } from 'prismic-reactjs';

const LinkWidget = ({ slice }) => {
    //const { body } = footer_widget.data;
    //return footer_widget.map((slice, indexKey) => {
    const [isOpenClass, setOpenClass] = useState(false)
    const openClass = () => {
        setOpenClass(!isOpenClass);
    };
    return (
        <div className="col-lg-3">
            <div onClick={openClass} className="footer-widget nav-folderized">
                <div className={isOpenClass ? 'ftr__list folderized-child open': 'ftr__list folderized-child'}>
                    <span className="h4">
                        {RichText.asText(slice.primary.heading_label)}
                        <i className="bx bxs-chevron-down i-down" />
                        <i className="bx bxs-chevron-up i-up" />
                    </span>
                    {
                        (slice.items.length) && <ul className="folderized-link-box">
                            <SubMenu data={slice.items} name={'widger-menu'} />
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
    //})
}

export default LinkWidget