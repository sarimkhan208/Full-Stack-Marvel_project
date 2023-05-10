import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useContext, useEffect, useState } from 'react';
  import axios from 'axios'
import { baseURL } from '../BaseURL';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


  export default function EditMarvel() {
    const {isAuth} = useContext(AuthContext)
    const [image,setImage] = useState("")
    const [name,setName] = useState("")
    const [actorName,setActorName] = useState("")
    const [data,setData] = useState()
    const {id} = useParams()
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getData = ()=>{
        axios.get(`${baseURL}/marvel`)
        .then((res)=>{
            setData([...res.data])
        })
        .catch((err)=>console.log(err))
    }
    

    useEffect(()=>{
        getData()
    },[])



    const handleUpdate = ()=>{

        let payload = {}
        if(image){
          payload.image=image
        }
        if(name){
          payload.title=name
        }
        if(actorName){
          payload.actor_name=actorName
        }

        if(!payload.image && !payload.title && !payload.actor_name){
          alert("Write Your Changes")
        }else{
          setIsLoading(true)
          axios.patch(`${baseURL}/marvel/update/${id}`,payload,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((res)=>{
            setIsLoading(false)
            if(res.data.msg == "You are not authorized to do this action"){
              alert("You are not authorized to do this action")
            }else{
              alert("An Avenger has been Updated")
            }
          })
          .catch((err)=>{
            alert("Please Login first")
            navigate("/signin")
            setIsLoading(false)
          })
        }
      
      
    }
  
    return (
      <Flex
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('black', 'black')}>
        <Stack spacing={8} mx={'auto'} width={{base:'90%',sm:'40%'}} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} color={'red'} textAlign={'center'}>
              Edit Your Avenger
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
                <FormLabel color={'white'}>Avenger Name</FormLabel>
                <Input color={'white'} type="text" value={name} onChange={(e)=>setName(e.target.value)} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel color={'white'}>Actor Name</FormLabel>
                <Input color={'white'} type="text" value={actorName} onChange={(e)=>setActorName(e.target.value)} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  loadingText='Assembling Avenger'
                  colorScheme='teal'
                  variant='outline'
                  spinnerPlacement='start'
                  onClick={()=>handleUpdate()}
                  size="lg"
                  bg={'red'}
                  color={'white'}
                  _hover={{
                    bg: 'red.400',
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