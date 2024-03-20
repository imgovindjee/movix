import React, { useState } from 'react'


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../Components/switchTab/SwitchTab';
import Carousel from '../../../Components/carousel/Carousel';

// calling the FETCH API using useFetch hooks
import useFetch from '../../../Hooks/useFetch';


const Popular = () => {

    // use-State hooks
    const [endPoints, setEndPoints] = useState('movie');

    // fetching the date and then De-structuring them
    const { data, loading } = useFetch(`/${endPoints}/popular`);

    const onTabChange = (tab) => {
        setEndPoints(tab === 'Movies' ? "movie" : "tv")
    };



    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className="carouselTitle">Popular Movies / Show</span>
                <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>

            <Carousel 
                data={data?.results} 
                loading={loading}
                endPoints={endPoints} 
            />
        </div>
    )
}

export default Popular