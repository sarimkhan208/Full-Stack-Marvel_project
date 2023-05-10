import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Button,
    Heading,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react';
  import { useContext, useState } from 'react';
  import { Link as RouterLink , useNavigate} from 'react-router-dom';
  import axios from 'axios'
import { baseURL } from '../BaseURL';
import { AuthContext } from '../context/authContext';


  export default function AddAvenger() {
    
    const [image,setImage] = useState("")
    const [name,setName] = useState("")
    const [actorName,setActorName] = useState("")
    const {isAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)


    const handleClick = ()=>{
      if(!image || !name  || !actorName){
        alert("Please fill all the field")
      }else{
        let payload = {
          image:image,
          title:name,
          actor_name:actorName
        }
        setIsLoading(true)
        axios.post(`${baseURL}/marvel/create`,payload,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((res)=>{
          if(res.data.msg == 'Super Hero has been added'){
            alert("An avenger is added to the team")
          }
          setIsLoading(false)
          
        })
        .catch((err)=>{
          alert("Please Login first")
          setIsLoading(false)
          navigate('/signin')
        })
  
        setImage("")
        setName("")
        setActorName("")
      }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('black', 'black')}>
        <Stack spacing={8} mx={'auto'} width={{base:'90%',sm:'40%'}} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color={'red'} textAlign={'center'}>
              Add Your Avenger here....
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('black', 'black')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box width={'100%'}>
                  <FormControl id="lastName" >
                    <FormLabel color={'white'} >Image URL</FormLabel>
                    <Input color={'white'} type="text" value={image} onChange={(e)=>setImage(e.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel color={'white'} >Avenger Name</FormLabel>
                <Input color={'white'} type="text" value={name} onChange={(e)=>setName(e.target.value)} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel color={'white'} >Actor Name</FormLabel>
                <Input color={'white'} type="text" value={actorName} onChange={(e)=>setActorName(e.target.value)} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  loadingText='Assembling Avenger'
                  colorScheme='teal'
                  variant='outline'
                  spinnerPlacement='start'
                  onClick={()=>handleClick()}
                  size="lg"
                  bg={'red'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Avenger Assemble
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }