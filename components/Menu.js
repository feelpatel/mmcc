import { RichText } from 'prismic-reactjs';
import { default as NextLink } from 'next/link';
import SubMenu from './Submenu';
import { hrefResolver } from '../prismic-configuration';
import ActiveLink from './ActiveLink'
const Menu = (props) => {
    const { nav } = props.link.data;
    //console.log(props.link.data, "  props ")
    return nav.map((menuLink, index) => {
        return (
            (menuLink.items.length)
            ? <li className="menu-has-children" key={`top-menu-${index}`} >
                <a href={hrefResolver(menuLink.primary.link)}>{RichText.asText(menuLink.primary.label)}</a>
                <ul>
                    <SubMenu data={menuLink.items} name={'child-nav'} />
                </ul>
            </li>
            : <li  key={`top-menu-${index}`} >
                <ActiveLink activeClassName="active" href={hrefResolver(menuLink.primary.link)}   passHref>
                    <a >{RichText.asText(menuLink.primary.label)}</a>
                </ActiveLink>
                {/* <NextLink href={hrefResolver(menuLink.primary.link)}   passHref>
                    <a >{RichText.asText(menuLink.primary.label)}</a>
                </NextLink> */}
            </li>           
        );
    });
    //return null;

}
export default Menu