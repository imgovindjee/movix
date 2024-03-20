import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import useFetch from '../../../Hooks/useFetch'
import Genres from '../../../Components/genres/Genres'
import Image from '../../../Components/lazyLoadImage/Image'
import PosterFallback from "../../../assets/no-poster.png"
import Rating from '../../../Components/rating/Rating'
import { PlayIcon } from '../playbtn/PlayBtn'
import VideoPopUp from '../../../Components/videoPopUp/VideoPopUp'


import './DetailsBanner.scss'




const DetailsBanner = ({ video, crew }) => {

    // useState-Hooks
    // For the VideoPlayer
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);


    const { mediaType, id } = useParams();

    // fetching the details from the API-CALL 
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    // fetching the url of the page form the redux store
    const { url } = useSelector((state) => state.home);


    // function handler
    // Extracting the id of each Genres
    const __genres = data?.genres?.map((gen) => gen.id);


    // local variable
    // for director and writer 
    const director = crew?.filter((dir) => dir.job === "Director");
    const writer = crew?.filter((wrtr) => wrtr.job === "Writer" || wrtr.job === "Story" || wrtr.job === "Screenplay")



    // onClick handler button of "WatchTrailer"  
    const handlePlayTrailer = () => {
        setShow(true);
        setVideoId(video.key);
    }



    const to_Hours_And_Minutes = (totalMinutes) => {
        const hrs = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        return `${hrs}h ${mins > 0 ? `${mins}m` : ""}`;
    }




    return (
        <div className='detailsBanner'>
            {
                !loading ?
                    (
                        <>
                            {
                                !!data && (
                                    <React.Fragment>
                                        {/* upper section */}
                                        <div className="backdrop-img">
                                            <Image src={url.backdrop + data.backdrop_path} />
                                        </div>

                                        {/* merging the upper image part and the lower part of the body */}
                                        <div className="opacity-layer"></div>

                                        {/* lower part section */}
                                        <ContentWrapper>
                                            <div className="content">
                                                {/* Movie/Show Image or Poster */}
                                                <div className="left">
                                                    {
                                                        data.poster_path ?
                                                            (
                                                                <Image
                                                                    className='posterImg'
                                                                    src={url.backdrop + data.poster_path}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    className='posterImg'
                                                                    src={PosterFallback}
                                                                />
                                                            )
                                                    }
                                                </div>

                                                {/* Remainig deatils of the Movies/Show OverView */}
                                                <div className="right">

                                                    {/* Movies.Show TITLE section */}
                                                    <div className="title">
                                                        {
                                                            `${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`
                                                        }
                                                    </div>

                                                    {/* Movies or Show TAGLINE */}
                                                    <div className="subtitle">
                                                        {data.tagline}
                                                    </div>

                                                    {/* Movies or Shows GENRES-DETAILS */}
                                                    <Genres data={__genres} />

                                                    {/* Contants the TRAILER and RATING of the Movies or Show */}
                                                    <div className="row">
                                                        <Rating rating={data.vote_average.toFixed(1)} />
                                                        <div className="playbtn" onClick={handlePlayTrailer}>
                                                            <PlayIcon />
                                                            <span className="text">Watch Trailer</span>
                                                        </div>
                                                    </div>

                                                    {/* Breif Details about the Movie or Show */}
                                                    <div className="overview">
                                                        <div className="heading">Overview</div>
                                                        <div className="description">
                                                            {data.overview}
                                                        </div>
                                                    </div>

                                                    {/* Information about the Movie or Show RELEASE-DATE, RUNTIME or STATUS */}
                                                    <div className="info">
                                                        {
                                                            data.status &&
                                                            (
                                                                <div className="infoItem">
                                                                    <span className="text bold">
                                                                        Status:{" "}
                                                                    </span>
                                                                    <span className="text">
                                                                        {data.status}
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            data.release_date &&
                                                            (
                                                                <div className="infoItem">
                                                                    <span className="text bold">
                                                                        Release Date:{" "}
                                                                    </span>
                                                                    <span className="text">
                                                                        {dayjs(data.release_date).format("MMM D, YYYY")}
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            data.runtime &&
                                                            (
                                                                <div className="infoItem">
                                                                    <span className="text bold">
                                                                        Runtime:{" "}
                                                                    </span>
                                                                    <span className="text">
                                                                        {to_Hours_And_Minutes(data.runtime)}
                                                                    </span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>

                                                    {/* InFromation about the Movie or Show DIRECTOR, WRITER and CREATOR(IF EXISTS) */}
                                                    {
                                                        director?.length > 0 &&
                                                        (
                                                            <div className="info">
                                                                <span className="text bold">
                                                                    Director: {" "}
                                                                </span>
                                                                <span className="text">
                                                                    {director?.map((dir, idx) => (
                                                                        <span key={idx}>
                                                                            {dir.name}
                                                                            {director.length - 1 !== idx && ", "} {/* if Movie or Show has multiple Directors then.. */}
                                                                        </span>
                                                                    ))}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        writer?.length > 0 &&
                                                        (
                                                            <div className="info">
                                                                <span className="text bold">
                                                                    Writer: {" "}
                                                                </span>
                                                                <span className="text">
                                                                    {writer?.map((wrtr, idx) => (
                                                                        <span key={idx}>
                                                                            {wrtr.name}
                                                                            {writer.length - 1 !== idx && ", "} {/* if Movie or Show has MultipleWriters then.. */}
                                                                        </span>
                                                                    ))}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        data.created_by?.length > 0 &&
                                                        (
                                                            <div className="info">
                                                                <span className="text bold">
                                                                    Creator: {" "}
                                                                </span>
                                                                <span className="text">
                                                                    {data?.created_by?.map((creator, idx) => (
                                                                        <span key={idx}>
                                                                            {creator.name}
                                                                            {data?.created_by.length - 1 !== idx && ", "} {/* if Show has multiple Creator then.. */}
                                                                        </span>
                                                                    ))}
                                                                </span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>

                                            {/* For the Video-Clips,Trailer of the Movies or Show */}
                                            <VideoPopUp
                                                show={show}
                                                setShow={setShow}
                                                videoId={videoId}
                                                setVideoId={setVideoId}
                                                playing={true}
                                            />
                                        </ContentWrapper>
                                    </React.Fragment>
                                )
                            }
                        </>
                    )
                    :
                    (
                        <div className="detailsBannerSkeleton">
                            <ContentWrapper>
                                <div className="left skeleton">
                                </div>
                                <div className="right">
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                </div>
                            </ContentWrapper>
                        </div>
                    )
            }

        </div>
    )
}

export default DetailsBanner
