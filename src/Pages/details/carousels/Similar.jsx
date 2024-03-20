import React from 'react'

import Carousel from '../../../Components/carousel/Carousel'
import useFetch from '../../../Hooks/useFetch'




const Similar = ({ mediaType, id }) => {

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"



    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endPoints={mediaType}
        />
    )
}

export default Similar
