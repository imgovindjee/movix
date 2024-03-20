import React, { useState } from 'react'


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import VideoPopUp from '../../../Components/videoPopUp/VideoPopUp';
import Image from '../../../Components/lazyLoadImage/Image';
import { PlayIcon } from '../playbtn/PlayBtn';


import './OfficialVideoSection.scss'





const OfficialVideoSection = ({ data, loading }) => {

    // use-State Hooks
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);


    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    }


    const Thumbnail_URL = (video) => {
        return `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;
    }



    return (
        <div className='videosSection'>
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>

                {
                    !loading ?
                        (
                            <div className="videos">
                                {
                                    data?.results?.map((video) => (
                                        <div
                                            key={video.id}
                                            className="videoItem"
                                            onClick={() => {
                                                setVideoId(video.key);
                                                setShow(true);
                                            }}
                                        >
                                            <div className="videoThumbnail">
                                                <Image src={Thumbnail_URL(video)} />
                                                <PlayIcon />
                                            </div>
                                            <div className="videoTitle">
                                                {video.name}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        :
                        (
                            <div className="videoSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )
                }
            </ContentWrapper>

            {/* Video-PopUp Display Section */}
            <VideoPopUp
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
                playing={false}
            />

        </div>
    )
}

export default OfficialVideoSection
