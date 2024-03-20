import React, { useState, useEffect } from 'react'
import { HiOutlineSearch } from "react-icons/hi"; //Serach Icons
import { SlMenu } from "react-icons/sl"; //Menu icons
import { VscChromeClose } from "react-icons/vsc"; //Close Icons

import { useLocation, useNavigate } from 'react-router-dom';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/movix-logo.svg";

import "./Header.scss"

const Header = () => {
    // use state Hooks
    const [show, setShow] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");

    // Navigator hooks
    const navigate = useNavigate();
    const location = useLocation();


    // using use-Effects hoooks
    // to add location property while changing the tabs
    useEffect(()=>{
        // This will set the scroll to top when we change the tab or section
        window.scrollTo(0, 0); 
    }, [location]);



    // Using use-Effects hooks
    // to add transition property while scrolling the tab
    useEffect(()=>{
        window.addEventListener("scroll", controlNavbar);
        return ()=>{
            window.removeEventListener("scroll", controlNavbar);
        }
    }, [lastScrollY])

    const controlNavbar = () =>{
        // console.log(window.scrollY);
        if(window.scrollY > 200){
            if(window.scrollY > lastScrollY && !mobileMenu){
                setShow("hide");
            } else{
                setShow("show");
            }
        } else{
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }



    // onclick function handlers
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const closeMobileMenu = () => {
        setMobileMenu(false);
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const closeShow = () =>{
        setShowSearch(false);
    };

    const searchQueryHandler = (event) => {
        if(event.key ==="Enter" && query.length>0){
            navigate(`/search/${query}`);

            setTimeout(()=>{
                setShowSearch(false);
            }, 1000);
        }
    };



    // navigation handler
    const navigationHandler = (type) => {
        if(type === "movie"){
            navigate(`/explore/${type}`);
        } else{
            navigate(`/explore/${type}`);
        }

        setMobileMenu(false);
    }



    return (
        <header className={`header ${mobileMenu?"mobileView":""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={()=>navigate("/")}>
                    <img src={logo} alt="" />
                </div>

                {/* Normal Device Menu section */}
                <ul className="menuItems">
                    <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
                    <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch}/>
                    </li>
                </ul>

                {/* mobile view of the Menu section */}
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch}/>
                    {
                        mobileMenu ?
                            (<VscChromeClose onClick={closeMobileMenu} />)
                            :
                            (<SlMenu onClick={openMobileMenu} />)
                    }

                </div>
            </ContentWrapper>


            {/* Search section */}
            {showSearch && (<div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">
                        <input 
                            type="text" 
                            placeholder="Search for movies or TV Shows..." 
                            onChange={(e)=>setQuery(e.target.value)} 
                            onKeyUp={searchQueryHandler}
                        />
                        <VscChromeClose onClick={closeShow}/>
                    </div>
                </ContentWrapper>
            </div>)}

        </header>
    )
}

export default Header
