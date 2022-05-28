import React, { useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardSkeleton from '../components/CardSkeloton'
import { FavoriteIcon, FavoriteFilledIcon,DeleteIcon } from './icons'
import "./Home.css"
import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getFavoriteEvents, toggleFavorite, getFavoriteEventsHandler, deleteEvent } from '../stores/eventSlice';
import { FaSearch } from 'react-icons/fa';
import Card from './Card';

const Favorites = () => {

    const dispatch = useDispatch()
    const { favorites, theme } = useSelector((state) => state.event);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);

    useEffect(() => {
        dispatch(getFavoriteEvents());
    }, [])

    useEffect(() => {
        setFavoriteEvents(favorites.ids)
        setLocalEvents(favorites.data)
    }, [favorites])

    const toggleFavoriteEvent = (id) => {
        favoriteEvents.includes(id) ? setFavoriteEvents(favoriteEvents.filter(e => e !== id)) : setFavoriteEvents([...favoriteEvents, id]); 
        dispatch(toggleFavorite(id))

        setTimeout(() => {
            favorites.data.map((event) =>{
                favorites.ids.includes(event._id) ? setLocalEvents(localEvents.filter(e => e._id !== event._id)) : null
            })
            dispatch(getFavoriteEventsHandler());
        }, 5000)
    }

    const deleteEventHandle = (id) => {
        const lastEvents = localEvents.filter((event) => event._id !== id);
        setLocalEvents(lastEvents)
        dispatch(deleteEvent(id))
    }

    const checkFavorite = (id) => favoriteEvents.includes(id);

    return (
        <Container className='home'> 
            <div className='container'>   
                <div className="row">       
                { !favorites.loading ?
                    localEvents.length > 0 ?
                    ( 
                        localEvents.map(
                            (event) => ( <Card key={event._id} event={event} toggleFavoriteEvent={toggleFavoriteEvent} checkFavorite={checkFavorite} deleteEventHandle={deleteEventHandle} theme={theme}/>)
                        )
                    )
                    :
                    (
                        <div style={{ 
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            minHeight: "70vh",
                            minWidth: "90vw"
                         }}>
                            <Heading
                            p='5'
                            fontWeight='extrabold'
                            size='xl'
                            bgGradient='linear(to-l, #04046b, #fb3173)'
                            bgClip='text'
                            >
                            Go to Search and add some events to your favorites
                            </Heading>
                            <Link className='btn-details' to="/search"> <FaSearch style={{ 
                                color: "#04046b",
                                marginRight: "6px",
                             }} /> Search </Link>                   
                        </div>
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