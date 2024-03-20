import React from 'react'
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa"
import { SiLeetcode } from "react-icons/si";
import { BsGithub } from "react-icons/bs";




import ContentWrapper from '../contentWrapper/ContentWrapper'

import "./Footer.scss"
import { Link } from 'react-router-dom';



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
                    <Link to='https://www.instagram.com/imgovind_jee/' target='_blank'  className='icon'>
                        <FaInstagram />
                    </Link>
                    <Link to='https://www.facebook.com/govind.jee.3154/' target='_blank' className='icon'>
                        <FaFacebookF />
                    </Link>
                    <Link to='https://www.Linkedin.com/in/shreegovindjee/' target='_blank' className='icon'>
                        <FaLinkedin />
                    </Link>
                    <Link to="https://leetcode.com/Shree_Govind_Jee/" target='_blank' className='icon'>
                        <SiLeetcode />
                    </Link>
                    <Link to='https://twitter.com/imgovind_jee' target='_blank' className='icon'>
                        <FaTwitter />
                    </Link>
                    <Link to='https://github.com/imgovindjee' target='_blank' className='icon'>
                        <BsGithub />
                    </Link>

                    
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
