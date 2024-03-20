import React from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
// React library custom CSS import 
import "react-circular-progressbar/dist/styles.css"


import './Rating.scss'


const Rating = ({ rating }) => {
    return (
        <div className='circleRating'>
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    )
}

export default Rating


// NOTE
// in above
// maxValue={XXX}, if not passed the it will take passed rating from 100
