import { default as NextLink } from 'next/link';
import { RichText } from 'prismic-reactjs';
import { hrefResolver } from '../prismic-configuration';
const SubMenu = (props) => {
    const { data, name } = props;
    return data.map((menuLink, indexKey) => {        
        return (
            <li key={`sub-${name}-${indexKey}`}>
                <NextLink href={hrefResolver(menuLink.link)} passHref>
                    <a >{RichText.asText(menuLink.label)}</a>
                </NextLink>
            </li>
        )
    })
}

export default SubMenu