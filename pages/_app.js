//import '../styles/globals.css'
import Router from 'next/router';
import '../styles/css/core.css';
import '../styles/boxicons/css/boxicons.min.css';
import 'swiper/swiper.scss';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: true });


Router.events.on('routeChangeStart', () => {
  // <div className='loader center' style={{fontSize:'100px'}}>
  //     <i className='bx bx-diamond bx-spin'></i>
  // </div>  
  console.log('onRouteChangeStart triggered');
  NProgress.start();
}); 
Router.events.on('routeChangeComplete', () => {
  console.log('onRouteChangeComplete triggered');
  NProgress.done();
}); 
Router.events.on('routeChangeError', () => {
  console.log('onRouteChangeError triggered');
  NProgress.done();
});


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
