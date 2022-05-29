import React from 'react';
import { getDate } from '../stores/eventSlice';
import { FavoriteIcon, FavoriteFilledIcon,DeleteIcon } from './icons'
import { Link } from "react-router-dom";

const Card = ({event, toggleFavoriteEvent, checkFavorite, deleteEventHandle, theme}) => {
    return (
        <div className="col-lg-4 col-sm-6 col-xs-12 d-flex justify-content-center">
            <div className="card">
                <div className="head">
                        <h5 className='title'> {event.title} </h5>
                        <h6 className='city'> {event.city} </h6>
                        <div className="line"></div>
                        <div style={{ 
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "10px",
                            marginBottom: "10px"
                            }}>
                            <img style={{ width: "250px" }} src={event.image_url} alt={ event.image_url } />
                        </div>
                        <div className='head2 unselectable'>
                            <div className='btn-actions' onClick={() => toggleFavoriteEvent(event._id)}> 
                                {
                                    checkFavorite(event._id) ? ( <FavoriteFilledIcon fill={ theme == "dark" ? 'white' : '#f70d1a'} />) : ( <FavoriteIcon fill={ theme == "dark" ? 'white' : '#f70d1a'} />)
                                }
                            </div>
                            <Link className='btn-details' to={`/event/${event._id}`}> Details </Link>
                            <div className='btn-actions' onClick={() => deleteEventHandle(event._id)}> 
                                <DeleteIcon fill={ theme == "dark" ? 'white' : '#f70d1a'}/>
                            </div>
                        </div>
                </div>
                <div className="body">
                    <h6> {getDate(event.date)} </h6>
                </div>
            </div>
        </div>
    )
}

export default Card;