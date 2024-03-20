import React from 'react'

import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


import Image from '../lazyLoadImage/Image';
import Genres from '../genres/Genres';
import Rating from '../rating/Rating';
import PosterFallBack from '../../assets/no-poster.png'



import './MovieCard.scss'




const MovieCard = ({ data, fromSearch, mediaType }) => {

    // Geting the URL from the REDUX-STORE
    const { url } = useSelector((state) => state.home);

    const navigate = useNavigate();




    // Making the URL of the PosterImage
    const poster_URL = data.poster_path ? url.poster + data.poster_path : PosterFallBack;



    return (
        <div className='movieCard' onClick={()=> navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div className="posterBlock">
                <Image className="posterImg" src={poster_URL} />
                <Rating rating={data.vote_average.toFixed(1)} />
                {
                    !fromSearch && (
                        <React.Fragment>
                            <Genres data={data.genre_ids.slice(0, 2)} />
                        </React.Fragment>
                    )
                }
            </div>

            <div className="textBlock">
                <span className="title">
                    {
                        data.title || data.name
                    }
                </span>
                <span className="date">
                    {dayjs(data.release_date).format('MMM D, YYYY')}
                </span>
            </div>
        </div>
    )
}

export default MovieCard
