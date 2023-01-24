import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import '../App.css'
import LoginState from "../recoil/LoginState";


const fetchVedios = () => {
    return axios.get('http://localhost:4000/videos');
}

export default function FeaturedVideosInfo() {
    const { data: arr, isError, isLoading, error } = useQuery('Vedios', fetchVedios)
    const navigate = useNavigate();
    const login=useRecoilValue(LoginState)

    if (isLoading) {
        return <h1>Loading</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div className="FeaturedVideosList">
            <div className="FeaturedMatchesTitle">FEATURED VIDEOS</div>
            <div >
                {
                    arr?.data.map((arr) => {
                        return (
                            <div key={arr.id} className="ImageInFeaturedVedios">
                                <img src={arr.image} alt="is Loading" onClick={() => {
                                    if(login)
                                    navigate(`/videos/${arr.id}`);
                                    else 
                                    navigate('/login');
                                }
                                } />
                                <h3>{arr.title}</h3>
                                <div>{arr.time}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}



