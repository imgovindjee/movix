import React from 'react'

import Carousel from '../../../Components/carousel/Carousel'
import useFetch from '../../../Hooks/useFetch'




const Recommendation = ({ mediaType, id }) => {

    const { data, loading, error } = useFetch(`/${mediaType}/${id}/recommendations`);


    return (
        <Carousel
            title="Recommendations"
            data={data?.results}
            loading={loading}
            endPoints={mediaType}
        />
    )
}

export default Recommendation
