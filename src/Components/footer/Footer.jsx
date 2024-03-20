import React from 'react'
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    Faaedin,
} from "react-icons/fa"
import { SiLeetcode } from "react-icons/si";
import { BsGithub } from "react-icons/bs";



import ContentWrapper from '../contentWrapper/ContentWrapper'

import "./Footer.scss"



const Footer = () => {
    return (
        <footer className='footer'>
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>

                <div className="infoText">
                    Explore the cinematic universe with Movix. <br />Discover your next favorite film, browse through genres, actors, directors, and more. Immerse yourself in the magic of movies with our comprehensive database. Start your cinematic journey today!
                </div>

                <div className="socialIcons">
                    <a herf='https://www.instagram.com/imgovind_jee/' target='_blank' className='icon'>
                        <FaInstagram />
                    </a>
                    <a herf='https://www.facebook.com/govind.jee.3154/' target='_blank' className='icon'>
                        <FaFacebookF />
                    </a>
                    <a herf='https://www.aedin.com/in/shreegovindjee/' target='_blank' className='icon'>
                        <Faaedin />
                    </a>
                    <a herf="https://leetcode.com/Shree_Govind_Jee/" target='_blank' className='icon'>
                        <SiLeetcode />
                    </a>
                    <a herf='https://twitter.com/imgovind_jee' target='_blank' className='icon'>
                        <FaTwitter />
                    </a>
                    <a herf='https://github.com/imgovindjee' target='_blank' className='icon'>
                        <BsGithub />
                    </a>

                    
                    {/* <span className="icon"><FaFacebookF /></span>
                    <span className="icon"><FaInstagram /></span>
                    <span className="icon"><Faaedin /></span>
                    <span className="icon"><FaTwitter /></span> */}
                </div>

                <div className="infoText">
                    CopyRight&nbsp;&copy;&nbsp;2024&nbsp;Movix.&nbsp;All&nbsp;Rights&nbsp;Reserved
                </div>
            </ContentWrapper>
        </footer>
    )
}

export default Footer
