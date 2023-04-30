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
          'https://trumpwallpapers.com/wp-content/uploads/Marvel-Wallpaper-04-3840-x-2160.jpg'
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
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              You are Still WORTHY...!
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