import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'



import useFetch from '../../Hooks/useFetch'
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper'
import { fetchDataFromAPI } from '../../Utils/api'
import MovieCard from '../../Components/movieCard/MovieCard';
import Spinner from '../../Components/spinner/Spinner';



import "./Explore.scss"



// Local variables for  the Filters-section
let filters = {};
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];



const Explore = () => {

    // useState Hooks
    const [data, setDate] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    const [genre, setGenre] = useState(null)
    const [sortBy, setSortBy] = useState(null)
    const { mediaType } = useParams();


    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    // function to handle FetchDataFrom_API
    // Api-Call
    // fetching the Initial-Data and then setting the Data to the  "setData"
    const HandleFetchInitialData = () => {
        setLoading(true);
        fetchDataFromAPI(`/discover/${mediaType}`, filters).then((res) => {
            setDate(res);
            setPageNumber((previousPageNumber) => previousPageNumber + 1);
            setLoading(false);
        })
    }

    // fetching the next-Data handler
    const HandleFetchNextPageData = () => {
        fetchDataFromAPI(`/discover/${mediaType}?page=${pageNumber}`, filters).then((res) => {
            if (data?.results) {
                setDate({
                    ...data, results: [...data?.results, ...res.results]
                });
            } else {
                setDate(res)
            }
            setPageNumber((previousPageNumber) => previousPageNumber + 1);
        })
    }

    // using useEffect Hooks :- Initializing the all the Hooks Back to Default
    // this works just like "componentDidMount()"
    useEffect(() => {
        filters = {};
        setDate(null);
        setPageNumber(1);
        setSortBy(null)
        setGenre(null)
        HandleFetchInitialData();
    }, [mediaType]);




    // Function Handlers-onClick
    // to handle the filter section when onCLick
    const HandleFilterChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortBy(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === 'genres') {
            setGenre(selectedItems)
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }
        setPageNumber(1);
        HandleFetchInitialData();
    }



    return (
        <div className='explorePage'>
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {
                            mediaType === 'tv'
                                ? "Explore TV Shows"
                                : "Explore Movies"
                        }
                    </div>
                    
                    {/* Filters the Data Form the Database form the API */}
                    <div className="filters">
                        <Select
                            isMulti="geners"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={HandleFilterChange}
                            placeholder="Select Genres"
                            className='react-select-container genresDD'
                            classNamePrefix="react-select"
                        />
                        <Select
                            name='sortby'
                            value={sortBy}
                            options={sortbyData}
                            onChange={HandleFilterChange}
                            isClearable={true}
                            placeholder="Sort By"
                            className='react-select-container sortbyDD'
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                {
                    loading && <Spinner initial={true} />
                }
                {
                    !loading &&
                    (
                        <>
                            {
                                data?.results?.length > 0 ? (
                                    <InfiniteScroll
                                        className='content'
                                        dataLength={data?.results?.length || []}
                                        next={HandleFetchNextPageData}
                                        hasMore={pageNumber <= data?.total_pages}
                                        loader={<Spinner />}
                                    >
                                        {
                                            data?.results?.map((item, index) => {
                                                if (item.media_type === "person") return;
                                                else {
                                                    return (
                                                        <MovieCard key={index} data={item} mediaType={mediaType} />
                                                    )
                                                }
                                            })
                                        }
                                    </InfiniteScroll>
                                ) : (
                                    <span className="resultNotFound">
                                        Sorry, Results Not Found!
                                    </span>
                                )
                            }
                        </>
                    )
                }
            </ContentWrapper>

        </div>
    )
}


export default Explore
