import React, { useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, getFavoriteEvents, getDate, toggleFavorite, deleteEvent } from '../stores/eventSlice';
import CardSkeleton from '../components/CardSkeloton'
import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css"

const Home = () => {

    const dispatch = useDispatch()
    const { events, favorites, theme } = useSelector((state) => state.event);
    
    const [localEvents, setLocalEvents] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState([]);

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getFavoriteEvents());
    }, [])

    useEffect(() => {
        setFavoriteEvents(favorites.ids)
    }, [favorites])

    useEffect(() => {
        setLocalEvents(events.data)
    }, [events])

    const deleteEventHandle = (id) => {
        const lastEvents = localEvents.filter((event) => event._id !== id);
        setLocalEvents(lastEvents)
        dispatch(deleteEvent(id))
    }

    const toggleFavoriteEvent = (id) => {
        favoriteEvents.includes(id) ? setFavoriteEvents(favoriteEvents.filter(e => e !== id)) : setFavoriteEvents([...favoriteEvents, id]); 
        dispatch(toggleFavorite(id))
    }

    const checkFavorite = (id) => favoriteEvents.includes(id)

    return (
        <Container className='home'> 
            <div className='container'>   
                <div className="row">       
                { !events.loading ?
                    localEvents.map(
                        (event) => ( <Card key={event._id} event={event} toggleFavoriteEvent={toggleFavoriteEvent} checkFavorite={checkFavorite} deleteEventHandle={deleteEventHandle} theme={theme}/> )
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