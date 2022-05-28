import { useState, useEffect } from 'react';
import { Button, HStack, Input, Heading, VStack} from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import Card from './Card';
import { SpinnerDotted } from 'spinners-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
    const [content, setContent] = useState('');
    const [statusInput, setStatusInput] = useState(true);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const { theme } = useSelector((state) => state.event);

    function handleSubmit(e){
        if(content != '') {
            setLoading(true);
            
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        } else {
            toast.error('Please enter the word you want to search!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                theme: "dark"
                });
        }
        e.preventDefault();
    }

    if (content && !statusInput) {
        setStatusInput(true);
    }
 
    return (
        <div className='home'>
            <ToastContainer/>
            <VStack p={4} minH='100vh' pb={28}>
    
                <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient={theme == "dark" ? 'linear(to-l, #ff528a, #fb3173)' : 'linear(to-l, #04046b, #fb3173)'}
                bgClip='text'
                >
                Search Event
                </Heading>
                
                <form onSubmit={handleSubmit}>
                    <HStack mt='4' mb='4'>
                        <Input
                            h='46'
                            borderColor={!statusInput ? '#fb3173' : 'transparent'}
                            variant='filled'
                            placeholder='Search event or artist'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button
                        style={{ 
                            backgroundColor: '#fb3173',
                            color: 'white',
                        }}
                        px='8'
                        pl='5'
                        pr='5'
                        h='46' 
                        type='submit'> <FaSearch size={30}/> </Button>
                    </HStack>
                </form>
            </VStack>
            <div className='container'>   
                <div className="row">       
                { !loading ? 
                    events.length > 0 ?
                    ( 
                        events.map(
                            (event) => ( <Card key={event._id} event={event} toggleFavoriteEvent={toggleFavoriteEvent} checkFavorite={checkFavorite} deleteEventHandle={deleteEventHandle} theme={theme}/>)
                        )
                    )
                    : 
                        (null)    
                    : 
                     (
                        <SpinnerDotted style={{ 
                            marginTop:'100px'
                         }} size={90} color={theme == 'dark' ? '#fb3173' : '#04046b'} />
                    )
                        
                }
                </div>
            </div>
      </div>
    );
}

export default Search;