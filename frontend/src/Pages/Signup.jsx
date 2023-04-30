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
    Link,Image
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Link as RouterLink, useNavigate } from 'react-router-dom';
  import axios from 'axios'
import { baseURL } from '../BaseURL';


  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [pass,setPass] = useState("")
    const [age,setAge] = useState("")
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false)



    const handleClick = ()=>{
      let payload = {
        name:name,
        email:email,
        pass:pass,
        age:Number(age)
      }
      if(!name || !email || !pass || !age){
        alert('Please fill all fields')
      }else{
        setIsLoading(true)
        axios.post(`${baseURL}/user/signup`,payload)
        .then((res)=>{
          setIsLoading(false)
          alert("account created successfull")
          navigate("/signin")
        })
        .catch((err)=>{
          setIsLoading(false)
          alert(err)
        })
      }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('black', 'black')}>
        <Stack spacing={8} mx={'auto'} width={'40%'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'} color={'white'} >
              Sign Up To be The Part Of <Image src='https://i.postimg.cc/XvgWHQg6/logo.png' />
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
                    <FormLabel color={'white'} >Name</FormLabel>
                    <Input color={'white'} type="text" onChange={(e)=>setName(e.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel color={'white'}>Email address</FormLabel>
                <Input color={'white'} type="email" onChange={(e)=>setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>
                  <Input color={'white'} type={showPassword ? 'text' : 'password'} onChange={(e)=>setPass(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel color={'white'}>Age</FormLabel>
                <Input color={'white'} type="number" onChange={(e)=>setAge(e.target.value)} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isLoading}
                  loadingText='Welcome to Multiverse'
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} color={'white'}>
                  Already a user? <RouterLink><Link color={'blue.400'}>Login</Link></RouterLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }