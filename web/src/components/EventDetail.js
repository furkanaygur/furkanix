import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

const EventDetail = () => {

    const [event, setEvent] = useState([]);

    const params = useParams();
    const { id } = params;

    const getEventDetails = async () => {
        const eventDetails = await axios.get(
            `http://localhost:8080/api/event/${id}`,
            );
    
        if (eventDetails.data.status == 200) {
            setEvent(eventDetails.data.data);
        }    
    }

    useEffect(() => {
        getEventDetails();
    }, [])

    return (
        <Container className='home'>
            <div key={event._id}>
                <h1>{event.title}</h1>
            </div>
        </Container>
    )

}

export default EventDetail;