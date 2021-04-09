import Prismic from '@prismicio/client'

export const apiEndpoint = 'https://mastercastingcad.cdn.prismic.io/api/v2'
export const accessToken = ''

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  return '/'
}

// Additional helper function for Next/Link component
export const hrefResolver = (doc) => {
  if (doc.type === 'page' || doc.type === 'register') {
    return `/${doc.uid}`
  } 
  return '/'
}
