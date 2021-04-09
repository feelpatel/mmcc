import React,{useRef} from 'react'
import { Client, manageLocal } from '../utils/prismicHelpers'
import Layout from '../components/Layout';
import SliceZone from '../components/Slice/SliceZone';
import {FancyBox} from '../components/Slice/FancyBox'

export default function Home({ doc,logo, menu, footer_widget }) {
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
}

/* export async function getServerSideProps({locale, locales}) {  
  const client = Client()
  const menu = await client.getSingle('top_menu',{lang:locale})
  const footer_widget = await client.getSingle('footer_widget',{lang:locale})
  const logo = await client.getSingle('logo',{lang:locale});
  const doc = await client.getSingle('homepage',{lang:locale});
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

export async function getStaticProps({locale, locales}) {
  const client = Client()
  const menu = await client.getSingle('top_menu',{lang:locale})
  const footer_widget = await client.getSingle('footer_widget',{lang:locale})
  const logo = await client.getSingle('logo',{lang:locale});
  const doc = await client.getSingle('homepage',{lang:locale});
  //const { currentLang, isMyMainLanguage} = manageLocal(locales, locale)
  return {
    props: {
      doc,
      logo,
      menu,
      footer_widget,
      
    }
  }
}