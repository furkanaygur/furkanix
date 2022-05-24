import React, { useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, getFavoriteEvents, getDate, toggleFavorite, deleteEvent } from '../stores/eventSlice';
import CardSkeleton from '../components/CardSkeloton'
import { FavoriteIcon, FavoriteFilledIcon,DeleteIcon } from './icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const dispatch = useDispatch()
    const { events, favorites, status } = useSelector((state) => state.event);
    
    const [localEvents, setLocalEvents] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getFavoriteEvents());
    }, [])

    useEffect(() => {
        setFavoriteEvents(favorites.ids)
    }, [favorites])

    useEffect(() => {
        setLocalEvents(events.data)
        setError(events.error)
    }, [events])
    
    useEffect(() => {
        if(status != null){
            toast(status, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                theme: "dark"
                });
        }
    }, [status])

    const checkFavorite = (id) => favoriteEvents.includes(id)

    const toggleFavoriteEvent = (id) => {
        favoriteEvents.includes(id) ? setFavoriteEvents(favoriteEvents.filter(e => e !== id)) : setFavoriteEvents([...favoriteEvents, id]); 
        dispatch(toggleFavorite(id))
    }

    const deleteEventHandle = (id) => {
        const lastEvents = localEvents.filter((event) => event._id !== id);
        setLocalEvents(lastEvents)
        dispatch(deleteEvent(id))
    }

    return (
        <Container className='home'> 
            <div className='container'>   
                <div className="row">
                <ToastContainer />        
                { !events.loading ?
                    localEvents.map(
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
                                        <div className='head2 unselectable'>
                                            <div className='btn-actions' onClick={() => toggleFavoriteEvent(event._id)}> 
                                                {
                                                    checkFavorite(event._id) ? ( <FavoriteFilledIcon />) : ( <FavoriteIcon/>)
                                                }
                                            </div>
                                            <div className='btn-details'> Details</div>
                                            <div className='btn-actions' onClick={() => deleteEventHandle(event._id)}> 
                                                <DeleteIcon/>
                                            </div>
                                        </div>
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

export default Home