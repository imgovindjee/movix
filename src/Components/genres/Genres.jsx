import React from 'react'

import { useSelector } from 'react-redux'


import "./Genres.scss"


const Genres = ({ data }) => {

    // getting the selector form the redux Store
    const { genres } = useSelector((state) => state.home);

    return (
        <div className='genres'>
            {
                data?.map((gen) => {
                    if (!genres[gen]?.name) return;
                    return (
                        <div key={gen} className="genre">
                            {genres[gen]?.name}
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Genres
