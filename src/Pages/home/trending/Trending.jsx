import React, { useState } from 'react'


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../Components/switchTab/SwitchTab';
import Carousel from '../../../Components/carousel/Carousel';

// calling the FETCH API using useFetch hooks
import useFetch from '../../../Hooks/useFetch';


const Trending = () => {

  // use-State hooks
  const [endPoints, setEndPoints] = useState('day');

  // fetching the date and then De-structuring them
  const { data, loading } = useFetch(`/trending/all/${endPoints}`);

  const onTabChange = (tab) => {
    setEndPoints(tab === 'Day' ? "day" : "week")
  };



  return (
    <div className='carouselSection'>
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab data={["Day", "Weeks"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
