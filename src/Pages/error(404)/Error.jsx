import React from 'react'

import ContentWrapper from '../../Components/contentWrapper/ContentWrapper'

import "./Error.scss"

const Error = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
    )
}


export default Error
