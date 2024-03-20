import React, { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'


import { fetchDataFromAPI } from '../../Utils/api'
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper'
import MovieCard from '../../Components/movieCard/MovieCard'
import Spinner from '../../Components/spinner/Spinner'
import noResults from "../../assets/no-results.png"




import "./SearchResults.scss"



const SearchResults = () => {

    // using useState Hooks
    const [data, setData] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    const { query } = useParams();


    // function to handle FetchDataFrom_API
    // Api-Call
    // fetching the Initial-Data and then setting the Data to the  "setData"
    const HandleFetchInitialData = () => {
        setLoading(true);
        fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNumber}`).then((res) => {
            setData(res)
            setPageNumber((previousPageNumber) => previousPageNumber + 1);
            setLoading(false)
        })
    }

    // fetching the next-Data handler
    const HandleFetchNextPageData = () => {
        fetchDataFromAPI(`/search/multi?query=${query}&page=${pageNumber}`).then((res) => {
            if (data?.results) {
                setData({
                    ...data, results: [...data?.results, ...res.results]
                });
            } else {
                setData(res);
            }
            setPageNumber((previousPageNumber) => previousPageNumber + 1);
        })
    }


    // using useEffect Hooks
    // this works just like "componentDidMount()"
    useEffect(() => {
        setPageNumber(1);
        HandleFetchInitialData();
    }, [query]);



    return (
        <div className='searchResultsPage'>
            {
                loading && <Spinner initial={true} />
            }
            {
                !loading &&
                (
                    <ContentWrapper>
                        {
                            data?.results?.length > 0 ? (
                                <>
                                    <div className="pageTitle">
                                        {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                                    </div>

                                    {/* Making the infinite loading of the Page */}
                                    {/* OR Simply the Infinte Scrolling Effect of page to provide Modern Look */}
                                    <InfiniteScroll
                                        className='content'
                                        dataLength={data?.results?.length || []}
                                        next={HandleFetchNextPageData}
                                        hasMore={pageNumber <= data?.total_pages}
                                        loader={<Spinner />}
                                    >
                                        {
                                            data?.results.map((item, index) => {
                                                if (item.media_type === "person") return;
                                                else {
                                                    return <MovieCard key={index} fromSearch={true} data={item} />
                                                }
                                            })
                                        }
                                    </InfiniteScroll>
                                </>
                            ) : (
                                <span className="resultsNotFound">
                                    Sorry, Result Not Found
                                </span>
                            )
                        }
                    </ContentWrapper>
                )
            }
        </div>
    )
}

export default SearchResults
