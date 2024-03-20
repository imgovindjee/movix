import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import "./HeroBanner.scss"

import useFetch from '../../../Hooks/useFetch';

import Image from '../../../Components/lazyLoadImage/Image';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    // states hooks
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");


    // Navigator Hook
    const navigate = useNavigate();

    // Selector hooks
    const {url} = useSelector((state)=> state.home);

    // Date fetch using fetch-API
    const { data, loading } = useFetch("/movie/upcoming");


    // useEffect Hooks
    useEffect(() => {
        const bg = url.backdrop +  data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
        // console.log(bg);
    }, [data]);


    // Search Handler...
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };





    return (
        <div className="heroBanner">
            {/* Background Inage Loading... */}
            {!loading && (<div className="backdrop-img">
                <Image src={background}/>
            </div>)}


            <div className="opacity-layer"></div>
            
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome,</span>
                    <span className="subTitle">
                        Uncover, Discover, and Dive into the World of Cinema with Movix!<br/>
                        Explore Now
                    </span>

                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for Movies or TV Show....'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />

                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner
