import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
import { Link as RouterLink} from 'react-router-dom';
  
  export default function HomePage() {
    return (
      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          'https://i.pinimg.com/564x/ce/ac/d2/ceacd2ac9ebb00fa88f12d924dc4fc31.jpg'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              bgClip='text'
              fontSize='4xl'
              fontWeight='extrabold'>
              You are Still WORTHY...3000!
            </Text>
            <Stack direction={'row'} >
            <RouterLink to='/marvelheroes' >
                <Button
                  bg={'#e23636'}
                  rounded={'full'}
                  color={'white'}
                  p={'10px'}
                  _hover={{ bg: '#e23636' }}>
                  Avengers
                </Button>
            </RouterLink>
            <RouterLink to='/marvelheroes' >
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                p={'10px'}
                _hover={{ bg: 'whiteAlpha.500' }}>
                Assemble
              </Button>
            </RouterLink>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  }