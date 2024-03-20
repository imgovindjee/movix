import { useEffect, useState } from 'react'

// ReactRouter SetUp
import { HashRouter, Routes, Route } from "react-router-dom";

// Api Fetch Kit
import { fetchDataFromAPI } from "./Utils/api"

// Redux toolkit
import { useSelector, useDispatch } from 'react-redux'
import { get_API_Configuration, get_Genres } from './ReduxStore/HomeSlice';



// Components and pages
import Header from "./Components/header/Header"
import Footer from "./Components/footer/Footer"
import Home from './Pages/home/Home';
import Details from './Pages/details/Details';
import Error from './Pages/error(404)/Error';
import Explore from './Pages/explore/Explore';
import SearchResults from "./Pages/serachResults/SearchResults"



function App() {
  // hooks
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  // console.log(url);

  useEffect(() => {
    fetchAPIConfig();
    genresCall();
  }, []);

  // const apiTesting = () => {
  //   fetchDataFromAPI("/movie/popular").then((res) => {
  //     console.log(res);
  //     dispatch(get_API_Configuration(res));
  //   });
  // };


  // fetching the data from the  API
  const fetchAPIConfig = () => {
    fetchDataFromAPI("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(get_API_Configuration(url));
    });
  }



  // fetching the data using "promises", using multiple endPoints
  const genresCall = async () => {
    let promise = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach((url) => {
      promise.push(fetchDataFromAPI(`/genre/${url}/list`))
    })

    // geting the data of all the endPoints together using "Promise.all"
    const data = await Promise.all(promise);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item.id] = item;
      });
    });

    console.log(allGenres);
    dispatch(get_Genres(allGenres));
  }





  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
