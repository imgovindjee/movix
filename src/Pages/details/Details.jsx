import React from 'react'

import { useParams } from 'react-router-dom'


import useFetch from '../../Hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import OfficialVideoSection from './officialsVideoSection/OfficialVideoSection'


import "./Details.scss"
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'




const Details = () => {

    const { mediaType, id } = useParams();

    // fetching the details from the API-CALL 
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading:creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);



    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
            <Cast data={credits?.cast} loading={creditsLoading}/>
            <OfficialVideoSection data={data} loading={loading}/>
            <Similar mediaType={mediaType} id={id}/>
            <Recommendation mediaType={mediaType} id={id}/>
        </div>
    )
}

export default Details
