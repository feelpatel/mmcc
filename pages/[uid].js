//pages/[uid].js
import React,{useRef} from 'react'
import { Client, manageLocal } from '../utils/prismicHelpers';
import SliceZone from '../components/Slice/SliceZone';
import Layout from '../components/Layout';
import { queryRepeatableDocuments } from '../utils/queries';
import {FancyBox} from '../components/Slice/FancyBox'

const Page = ({ doc,logo, menu, footer_widget }) => {
    const videoModalRef = useRef();
    if (doc && doc.data) {
        return (
            <>            
                <Layout doc={doc} logo={logo} menu={menu} footer_widget={footer_widget}>
                    <SliceZone videoModalRef={videoModalRef} sliceZone={doc.data.body}></SliceZone>
                </Layout>                      
            </>
        )
    }
    return null;
}

/* export async function getServerSideProps({params, locale, locales}) {  
    const client = Client()
    const menu = (await client.getSingle('top_menu',{lang:locale})) || {};
    const footer_widget = (await client.getSingle('footer_widget',{lang:locale})) || {};
    const logo = (await client.getSingle('logo',{lang:locale})) || {};
    const doc = (await client.getByUID('page', params.uid,{lang:locale})) || {};
    const { currentLang, isMyMainLanguage} = manageLocal(locales, locale)
    return {
        props: {
            doc,
            logo,
            menu,
            footer_widget,
            lang:{
                currentLang,
                isMyMainLanguage,
            }
        }
    }
} */

export async function getStaticProps({ params, locale, locales }) {
    const client = Client();   
    const menu = (await client.getSingle('top_menu',{lang:locale})) || {};
    const footer_widget = (await client.getSingle('footer_widget',{lang:locale})) || {};
    const logo = (await client.getSingle('logo',{lang:locale})) || {};
    const doc = (await client.getByUID('page', params.uid,{lang:locale})) || {};
   // const { currentLang, isMyMainLanguage} = manageLocal(locales, locale)
    return {
        props: {
            doc,
            logo,
            menu,
            footer_widget,
            // lang:{
            //     currentLang,
            //     isMyMainLanguage,
            // }
        }
    }
}

export async function getStaticPaths() {
    const allPages = await queryRepeatableDocuments((doc) => doc.type === 'page')
    const pagesPath = allPages.map(doc => `/${doc.uid}`)
   /* const pagesPath = ['/gallery',
  '/custom-made-jewellery',
  '/repair-services',
  '/diamonds-gemstones',
  '/covid19',
  '/3d-printing',
  '/custom-made-jewellery',
  '/line-developing',
  '/cad-cam',
  '/stone-setting',
  '/molds',
  '/casting',
  '/upcoming-shows',
  '/clean-scrap-service',
  '/cad-printing-services-and-design'];*/
 
   
    return {
        paths: pagesPath,
        fallback: false,
    }
}

export default Page