import React, { useEffect} from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardSkeleton from '../components/CardSkeloton'
import "./Home.css"

import { useDispatch, useSelector } from 'react-redux'
import { getFavoriteEvents, getDate } from '../stores/eventSlice';

const Favorites = () => {

    const dispatch = useDispatch()
    const { favorites } = useSelector((state) => state.event);
    
    useEffect(() => {
        dispatch(getFavoriteEvents());
    }, [])

    return (
        <Container className='home'> 
            <div className='container'>   
                <div className="row">         
                { !favorites.loading ? 
                    favorites.data.map(
                        (event) => (
                        <div key={event._id} className="col-lg-4 col-sm-6 col-xs-12 d-flex justify-content-center">
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
                                        <div className='head2'></div>
                                </div>
                                <div className="body">
                                    <h6> {getDate(event.date)} </h6>
                                </div>
                            </div>
                        </div>)
                    ) 
                    : 
                        <div className="row" stlye={{ display:'flex', justifyContent:'center', alignItems:'center' }}>  
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        </div>
                }
                </div>
            </div>
        </Container>
    )
}

export default Favorites