import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { baseURL } from '../BaseURL';

export default function Signin() {

  const [email,setEmail] = useState("")
  const [pass,setPass] = useState("")
  const navigate = useNavigate()
  const {setIsAuth} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  
  const handleClick = ()=>{
    let payload = {
      email:email,
      pass:pass
    }
    setIsLoading(true)
    axios.post(`${baseURL}/user/signin`,payload)
    .then((res)=>{
      localStorage.setItem("token",JSON.stringify(res.data.token))
      setIsAuth(true)
      setIsLoading(false)
      alert("login successfull")
      navigate("/")
    })
    .catch((err)=>{
      setIsLoading(false)
      alert("Wrong Credentials",err)
    })
  }


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('black', 'black')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'} color={'white'} >
              Sign In To<Image src='https://i.postimg.cc/XvgWHQg6/logo.png' />
            </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('black', 'black')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color={'white'}>Email address</FormLabel>
              <Input color={'white'} type="email" onChange={(e)=>setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel color={'white'}>Password</FormLabel>
              <Input color={'white'} type="password" onChange={(e)=>setPass(e.target.value)}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox color={'white'} >Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                isLoading={isLoading}
                loadingText='Bring me THANOS'
                colorScheme='teal'
                variant='outline'
                spinnerPlacement='start'
                onClick={()=>handleClick()}
                bg={'red'}
                color={'white'}
                _hover={{
                  bg: 'red.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}