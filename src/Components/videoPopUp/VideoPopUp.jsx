import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { IoCloseCircleOutline } from "react-icons/io5";


import './VideoPopUp.scss'


const VideoPopUp = ({ show, setShow, videoId, setVideoId, playing }) => {

    const hidePopUp = () => {
        setShow(false);
        setVideoId(null);
    };

    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopUp}></div>

            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopUp}>
                    <IoCloseCircleOutline />
                </span>

                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height='100%'
                    playing={playing}
                />
            </div>
        </div>
    )
}

export default VideoPopUp
