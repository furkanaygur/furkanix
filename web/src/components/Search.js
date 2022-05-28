import { useState, useEffect } from 'react';
import { Button, HStack, Input, Heading, VStack} from "@chakra-ui/react";
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'


const Search = () => {
    const [content, setContent] = useState('');
    const [statusInput, setStatusInput] = useState(true);

    const { theme } = useSelector((state) => state.event);

    function handleSubmit(e){
        e.preventDefault();
    }

    if (content && !statusInput) {
        setStatusInput(true);
    }
 
    return (
        <div className='home'>

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
      </div>
    );
}

export default Search;