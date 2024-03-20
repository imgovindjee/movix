import React, { useRef } from 'react'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs"; //Icons


import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';


import ContentWrapper from '../contentWrapper/ContentWrapper'
import Image from '../lazyLoadImage/Image'
import PosterFallback from "../../assets/no-poster.png";
import Rating from '../rating/Rating';
import Genres from '../genres/Genres';


import "./Carousel.scss"


const Carousel = ({ data, loading, endPoints, title }) => {

    // Reference Creation
    // using "ref"
    const carouselContainer = useRef();
    // console.log(carouselContainer.current); // catch of the virtual container


    const { url } = useSelector((state => state.home));

    // used in the "carousel" line 92 for navigate the page address(url)
    const navigate = useNavigate();


    // method (onClick handlers)
    const navigation = (direction) => {
        const container = carouselContainer.current;

        const scrollAmount =
            direction === 'Left'
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        })
    }

    // functions
    // skeleton Items
    const skeletonItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }


    return (
        <div className='carousel'>
            <ContentWrapper>
                {/* display of TITLE, if Available */}
                {
                    title &&
                    <div className='carouselTitle'>
                        {title}
                    </div>
                }

                <BsFillArrowLeftCircleFill
                    className='carouselLeftNav arrow'
                    onClick={() => navigation("Left")}
                />
                <BsFillArrowRightCircleFill
                    className='carouselRightNav arrow'
                    onClick={() => navigation("right")}
                />


                {/* Rendendring of the Data */}
                {
                    !loading ?
                        (
                            <div className="carouselItems" ref={carouselContainer}>
                                {
                                    data?.map((item) => {

                                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;

                                        return (
                                            <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endPoints}/${item.id}`)}>
                                                {/* POSTER BLOCK SECTION */}
                                                <div className="posterBlock">
                                                    <Image src={posterUrl} />
                                                    <Rating rating={item.vote_average.toFixed(1)} />
                                                    <Genres data={item.genre_ids.slice(0, 2)} />
                                                </div>

                                                {/* MOVIE-TITLE or TV-SHOW(name) */}
                                                {/* DATE OF RELEASE OF EITHER OF THEM */}
                                                <div className="textBlock">
                                                    <span className="title">
                                                        {item.title || item.name}
                                                    </span>
                                                    <span className="date">
                                                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) :
                        (
                            <div className="loadingSkeleton">
                                {skeletonItem()}
                                {skeletonItem()}
                                {skeletonItem()}
                                {skeletonItem()}
                                {skeletonItem()}
                                {skeletonItem()}
                            </div>
                        )
                }
            </ContentWrapper>

        </div>
    )
}

export default Carousel
