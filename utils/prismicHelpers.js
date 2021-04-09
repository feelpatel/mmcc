import Prismic from '@prismicio/client'
import Link from 'next/link'
import {
  apiEndpoint,
  accessToken,
  linkResolver,
  hrefResolver
} from '../prismic-configuration'

// Helper function to convert Prismic Rich Text links to Next/Link components
export const customLink = (type, element, content, children, index) => (
  <Link key={element.data.id} href={hrefResolver(element.data)} as={linkResolver(element.data)}>
    <a>{content}</a>
  </Link>
)

// Client method to query documents from the Prismic repo
export const Client = (req = null) => (
  Prismic.client(apiEndpoint, createClientOptions(req, accessToken))
)

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {}
  const accessTokenOption = prismicAccessToken ? { accessToken: prismicAccessToken } : {}
  return {
    ...reqOption,
    ...accessTokenOption,
  }
}

export const manageLocal = (Locales, locale) => {
    // Languages from API response
    // Setting Master language as default language option
    const mainLanguage = Locales[0];
    // Sets current language based on the locale
    const currentLang = locale !== undefined ? locale : mainLanguage;
    const isMyMainLanguage = mainLanguage === currentLang;

    return {mainLanguage, currentLang, isMyMainLanguage}
}

export const URL = 'https://stg.mastercastingandcad.com/mastercasting_api';//https://stg.mastercastingandcad.com/mastercasting_api/api/register_company
//export const URLPATH = '';

export const SendRequest = (path,body,method)=>{
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: method,
    headers: myHeaders,
  };
  if (method == 'POST'){
    requestOptions['body'] = body
  }
  
  console.log(requestOptions,"requestOptions",path, URL)
  return fetch(URL+path, requestOptions)
  .then(response => { 
    // if (!response.ok) {  
    //   return response.status;
    // }           
    return response; 
  })
}

export const SendFormRequest = (path,body,method)=>{
  var requestOptions = {
      method: method,
      body: body
  };
  return fetch(URL+path, requestOptions)
    .then(response => { 
        // if (!response.ok) {                         
        //   return response.status;
        // } 
        return response;           
        //return { status: response.status, res:res }
    })
}

export default Client
