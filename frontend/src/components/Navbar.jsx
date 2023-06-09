import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Image,
    useToast,
    VStack,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
  } from '@chakra-ui/icons';
import {FiUser} from 'react-icons/fi'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
  
  export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    
    const isAuth = localStorage.getItem("token")
    const username = localStorage.getItem("username")

    const navigate = useNavigate()
    const toast = useToast()

    const handleLogout = ()=>{
      localStorage.setItem('token','')
      localStorage.setItem('username','user')
      toast({
        title: 'Logout Successfull.',
        description: "User has been Logout",
        status: 'error',
        position : 'top',
        duration: 1200,
        isClosable: true,
      })
      navigate("/")
    }

  
    return (
      <Box  >
        <Flex

          bg={useColorModeValue('black', 'black')}
          color={useColorModeValue('white', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 2 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
              _hover={{bg:'black'}}
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon _hover={{bg:'black'}} color='#e23636' w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <RouterLink to='/' >
              <Image width={'200px'} height={'50px'} src='https://i.postimg.cc/XvgWHQg6/logo.png' alt='logo' />
            </RouterLink>
  
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
            <RouterLink to='/signup' >
              <Button
                mt={3}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                variant={'link'}
                fontWeight={600}
                color={'white'}
                _hover={{
                  color: 'pink.300',
                }}>
                Sign Up
              </Button>
            </RouterLink>


            {
                isAuth?<Box _hover={{cursor:'pointer'}} height={'100%'} width={{base:"50px",sm:'70px'}} ><VStack gap={0} >
                  <Box width={'100%'} textAlign={'center'} ><Icon color='red' fontSize={{base:'14px',sm:'24px'}} as={FiUser} onClick={handleLogout} /></Box>
                  <Box width={'100%'} textAlign={'center'} color='red'  fontSize={{base:'10px',sm:'13px'}} >{username}</Box>
                  
                  </VStack></Box>:<RouterLink to='/signin'>
                  <Button
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'#e23636'}
                    borderRadius={'4px'}
                    p={'8px'}
                    _hover={{
                      bg: 'pink.300',
                    }}
                    >
                    Sign In
                  </Button>
                  </RouterLink>
            }











            {/* <RouterLink to="/signin" >
              <Button
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'#e23636'}
                borderRadius={'4px'}
                p={'8px'}
                _hover={{
                  bg: 'pink.300',
                }}
                >
                Sign In
              </Button>
            </RouterLink> */}
          </Stack>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('white', 'white');
    const linkHoverColor = useColorModeValue('white', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'white');
  
    return (
      <Stack direction={'row'} spacing={4} borderColor={'black'} >
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label} mt={3} >
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <RouterLink
                  p={2}
                  // href={navItem.href ?? '#'}
                  to='/marvelheroes'
                  fontSize={'lg'}
                  fontWeight={600}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem.label}
                </RouterLink>
              </PopoverTrigger>
  
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
          
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
//   const DesktopSubNav = ({ label, href, subLabel }) => {
//     return (
//       <Link
//         href={href}
//         role={'group'}
//         display={'block'}
//         p={2}
//         rounded={'md'}
//         _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
//         <Stack direction={'row'} align={'center'}>
//           <Box>
//             <Text
//               transition={'all .3s ease'}
//               _groupHover={{ color: 'pink.400' }}
//               fontWeight={500}>
//               {label}
//             </Text>
//             <Text fontSize={'sm'}>{subLabel}</Text>
//           </Box>
//           <Flex
//             transition={'all .3s ease'}
//             transform={'translateX(-10px)'}
//             opacity={0}
//             _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//             justify={'flex-end'}
//             align={'center'}
//             flex={1}>
//             <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
//           </Flex>
//         </Stack>
//       </Link>
//     );
//   };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('red.500', 'gray.800')}
        
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('white', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  

  
  const NAV_ITEMS= [
    {
      label: 'Avengers',
      href:"/marvelheroes"
    }
  ];