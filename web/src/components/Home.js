import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardSkeleton from '../components/CardSkeloton'
import "./Home.css"



const Home = () => {

    const [events, setEvents] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => { 
        getEvents();
    }, []);

    const getEvents = async () => {
      setLoading(true);
      const fetchedEvents = await axios('http://localhost:8080/api/events');
      if (fetchedEvents.data.status == 200) {
        setEvents(fetchedEvents.data.data);
        console.log(fetchedEvents.data.data)
        setFavoriteEvents(fetchedEvents.data.favorites.map(favorite => favorite._id));
        setLoading(false);
      }
      
      setIsEmpty(true);
      if(fetchedEvents.data.data.length > 0){
        setIsEmpty(false);
      }
    };

    const getDate = date => {
        return moment(date.split('T')[0]).format('DD MMM, Y');
    };

    return (
        <Container className='home'> 
            <div className='container'>   
                <div className="row">         
                { !loading ?
                    events.map((event) =>
                        <div key={event._id} className="col-lg-4 col-sm-6 col-xs-12 d-flex justify-content-center">
                            <div className="card">
                                <div className="head" style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                                        <h5 style={{ textAlign:"center", marginBottom:'10px'  }}> {event.title} </h5>
                                        <h6 style={{ textAlign:"center",color:"#fb3173" }}> {event.city} </h6>
                                        <div className="line"></div>
                                        <div style={{ 
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: "10px",
                                            marginBottom: "10px"
                                         }}>
                                            <img style={{ width: "250px" }} src={`https://www.biletix.com/static/images/live/event/eventphotos/cemadrian-2020-11492202-10.png`} alt={ event.image_url } />
                                        </div>
                                    
                                </div>
                                <div className="body">
                                    <h6> {getDate(event.date)} </h6>
                                </div>
                            </div>
                        </div>
                    ) : 
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