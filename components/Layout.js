import Head from 'next/head';
import {Headers,SubNavBar} from './Headers';
import {MetaTag} from './MetaTag'
import Footer from './Footer';

const Layout = ({ altLangs, lang, logo, menu, footer_widget, children, doc }) => {
    console.log(doc.data.body1 ," doc ")
    return (
        <>
            <Head>
                <title>{doc.data.title}</title>
                <link rel="icon" href="/favicon.ico" />               
                <link href="https://fonts.googleapis.com/css2?family=Adamina&family=Nunito+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />   
                {
                   (doc.data.body1.length != 0) && <MetaTag SEO_Tags={doc.data.body1} /> 
                }                         
            </Head>
            <Headers altLangs={altLangs} lang={lang} menu={menu} logo={logo} />
            <main >                
                {children}
            </main>
            <Footer footer_widget={footer_widget} />      
            <SubNavBar altLangs={altLangs} lang={lang} menu={menu} logo={logo} type="mobile" ></SubNavBar>  
            <div id="mobile-body-overly"></div>
        </>
    )
}


export default Layout