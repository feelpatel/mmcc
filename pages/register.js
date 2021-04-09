import { Client,manageLocal } from '../utils/prismicHelpers'
import Layout from '../components/Layout';
import SliceZone from '../components/Slice/SliceZone'

export default function register({ doc, logo, menu, footer_widget }) {
  if (doc && doc.data) {
      return (
        <Layout doc={doc} logo={logo} menu={menu} footer_widget={footer_widget}>
          <SliceZone  sliceZone={doc.data.body}></SliceZone>
        </Layout>
      ) 
  }
}

export async function getStaticProps({locale, locales}) {
  const client = Client()
  const menu = await client.getSingle('top_menu')
  const footer_widget = await client.getSingle('footer_widget')
  const logo = await client.getSingle('logo');
  const doc = await client.getSingle('register');
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