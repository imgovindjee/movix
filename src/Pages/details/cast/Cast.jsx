import React from 'react'

import { useSelector } from 'react-redux'


import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import Image from '../../../Components/lazyLoadImage/Image'
import avatar from "../../../assets/avatar.png"


import './Cast.scss'




const Cast = ({ data, loading }) => {

    const { url } = useSelector((state) => state.home);


    // Rendering of the loadingSkeleton Body...
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="circle Skeleton"></div>
                <div className="row Skeleton"></div>
                <div className="row2 Skeleton"></div>
            </div>
        )
    }




    return (
        <div className='castSection'>
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>

                {
                    !loading ?
                        (
                            <div className="listItems">
                                {
                                    data?.map((item) => {
                                        let imgUrl = item.profile_path
                                            ? url.profile + item.profile_path
                                            : avatar;

                                        return (
                                            <div key={item.id} className='listItem'>
                                                <div className='profileImg'>
                                                    <Image src={imgUrl} />
                                                </div>
                                                <div className='name'>
                                                    {item.name}
                                                </div>
                                                <div className="character">
                                                    {item.character}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                        :
                        (
                            <div className="castSkeleton">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )
                }
            </ContentWrapper>

        </div>
    )
}

export default Cast
