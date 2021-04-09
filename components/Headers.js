import React,{useEffect, useRef, useState} from 'react'
import { default as NextLink } from 'next/link';
import Menu from './Menu'
import LoginModal from './LoginModal'
import ContactUs from './ContactUs'
import LanguageSwitcher from './LanguageSwitcher';

const Headers = ({ altLangs, lang, menu, logo }) => {    
    //const { logos, mobile_logo } = logo.data;
    const headerHeight = useRef(null);
    const [headerPadding, setPaddingState] = useState(0)
    const loginRef = useRef();

    useEffect(() => {
        setPaddingState(headerHeight.current.clientHeight)
        document.querySelector("body").classList.add("page-bg")
    }, [])
    const OpenMobileNav = () =>{
        document.querySelector("body").classList.add("mobile-nav-active")
    }

    return (
        <>
            <div style={{paddingTop : `${headerPadding}px`}} className="fixed-header-fill" />
            <header ref={headerHeight} id="header" className="header">
                <div className="menu-section">
                    <div className="container-fluid">
                        <div className="header-wrapper align-items-center justify-content-between row no-gutters">
                            <button onClick={OpenMobileNav} type="button" id="mobile-nav-toggle"><i className="bx bx-menu"></i></button>
                            <div id="logo" className="logo col-auto order-xxl-1">
                                <NextLink href="/">
                                    <a>
                                        <img
                                            src={logo.data.logos.url}
                                            alt="logo"                                            
                                        />
                                    </a>
                                </NextLink>
                            </div>
                            <div className="header-actions col-auto order-xxl-3">
                                <NextLink href="/"><a className="hide-sm" ><i className="bx bx-phone-call" /><span>(312)332-4434</span></a></NextLink>
                                <NextLink href="/"><a className="hide-md" ><i className="bx bx-mobile-alt" /><span>Mobile App</span></a></NextLink>                                
                                <LoginModal ref={loginRef} ></LoginModal>   
                                <a href="#" onClick={() => loginRef.current.openModal()} ><i className="bx bx-log-in" /><span>Login</span></a>                           
                                <NextLink href="/register"><a className="hide-sm" ><i className="bx bx-user" /><span>Register</span></a></NextLink>
                            </div>
                            <div className="main-menu col-xxl order-xxl-2">
                                <SubNavBar menu={menu} logo={logo} type={'web'} ></SubNavBar>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
        </>
    )
}

const useOutsideAlerter = (ref)=> {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                document.querySelector("body").classList.remove("mobile-nav-active")
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const SubNavBar = ({menu, logo, type})=>{
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    return (
       <>
            {
                (type=='web') ?
                <nav id={"nav-menu-container"}  className="nav-menu-container" >
                    <MobileNavbar menu={menu} type={type} logo={logo} />                  
                </nav> :
                <nav ref={wrapperRef} id={"mobile-nav"}  className="nav-menu-container" >
                    <MobileNavbar menu={menu} type={type} logo={logo} />                                                      
                </nav>            
            }            
       </>
    )  
}

const MobileNavbar = ({menu, logo, type}) => {   
    const contactRef = useRef() 
    const loginRef = useRef()
    return (
        <>
            <div className="m-nav m-nav-head">
                <img src="images/banner.jpg" className="bg-img" alt="banner" />
                <div className="head-content">
                    <div className="m-logo">
                        <img className="img-fluid" src={logo.data.mobile_logo.url} alt='logo'  />
                    </div>
                    <div className="access-block row g-2">
                        <div className="col">
                            <LoginModal ref={loginRef} ></LoginModal>   
                            <span onClick={() => loginRef.current.openModal()}  className="btn btn-primary"><i className="bx bx-log-in" />Login</span>
                        </div>
                        <div className="col">
                            <NextLink href="/register">
                                <a className="btn btn-primary"><i className="bx bx-user" />Register</a>
                            </NextLink>
                        </div>
                    </div>
                </div>
            </div>
            <ul className={`${type=='web' ? "nav-menu" : ""}`} >
                <Menu link={menu} />
                <ContactUs ref={contactRef} ></ContactUs>                 
                <li onClick={() => contactRef.current.openContactUsModal()}   >
                    <span >Contact Us</span>                    
                </li>    
            </ul>
            <ul className={`${type=='web' ? "m-nav" : ""}`}>
                <li className="has-icon"><span ><i className="bx bx-phone-call" />(312)332-4434</span></li>
                <li className="has-icon"><a href="#"><i className="bx bx-mobile-alt" />Mobile App</a></li>
            </ul>        
        </>
    )
}

export {
    Headers,
    SubNavBar,
    MobileNavbar
}