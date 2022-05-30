import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './EventDetail.css';
import { getDate } from '../stores/eventSlice';

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
            <div className="card card-event" style={{ marginTop:"90px", paddingTop:"20px", paddingBottom:"20px" }}>
			<div className="container-fliud" style={{ width:"100%" }}>
				<div className="wrapper row" style={{ justifyContent:"space-evenly", width:"100%" }}>
					<div className="preview col-md-6">
						
						<div className="preview-pic">
						  <div className="tab-pane active" style={{  width: '100%', height: '100%', display:"flex", alignItems:"center", justifyContent:"center", }}>
                              <img style={{ width:"400px", height:"auto" }} src={event.image_url} alt={event.image_url} />
                            </div>
						</div>	
					</div>
					<div className="details col-md-6" style={{ justifyContent:"space-evenly" }}>
						<h3 className="event-title">{event.title}</h3>
						<p className="event-description">{event.content}</p>
						<h4 className="date">Date: <span>{getDate(event.date)}</span></h4>
						<h4 className="date">City: <span>{event.city}</span></h4>
						<h4 className="date">Place: <span>{event.place}</span></h4>
						<div className="action" style={{ display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10px", marginBottom:"10px" }}>
							<a href={event.page_url} target="_blank"  className="btn btn-event" >Event Page</a>
						</div>
					</div>
				</div>
			</div>
		</div>
        </Container>
    )

}

export default EventDetail;