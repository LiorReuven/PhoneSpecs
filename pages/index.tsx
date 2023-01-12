import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Pagination from '../components/Pagination';
import PhoneCard from '../components/PhoneCard';
import { phonePreview } from './Latest';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [searchedPhones, setSearchedPhones] = useState<phonePreview[]>([]);
  const [error, setError] = useState({ show: false, text: '' });
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)  
  const [phonesPerPage, setPhonesPerPage] = useState(10)
  const [showPagin, setShowPagin] = useState(false)


  const onSubmitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (inputValue === '' || !inputValue.match(/^[A-Za-z0-9 ]*$/)) {
      return setError({
        show: true,
        text: 'No empty search or special characters allowed.',
      });
    }

    try {
      setisLoading(true);
      setError({show:false, text:''});
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/search?query=${inputValue}`,
        { method: 'GET' }
      );
      const data = await response.json();

      if (data.status && (data.data.phones.length > 0)) {
        setSearchedPhones(data.data.phones)
        if (data.data.phones.length > 10) {
          setShowPagin(true)
        }
        setisLoading(false);
      } else {
        setError({show:true,text:'No results found'})
        setisLoading(false);
      }
    } catch (error) {
      console.log(error)
    }
  };


const lastPhoneIndex = currentPage * phonesPerPage
const firstPhoneIndex = lastPhoneIndex - phonesPerPage
const paginationSearchedPhones = searchedPhones?.slice(firstPhoneIndex, lastPhoneIndex)

  return (
    <>
      <Flex
        my={'2rem'}
        alignItems={'center'}
        maxW={'80%'}
        mx={'auto'}
        direction={'column'}
      >
        <Heading>
          Welcome!,
          <br /> Search for a phone :
        </Heading>
        <Flex
          direction={'column'}
          w={'100%'}
          alignItems={'center'}
          as={'form'}
          onSubmit={onSubmitHandler}
        >
          <Flex
            my={'2rem'}
            w={{ md: '50%', base: '100%' }}
            border={'1px solid gray'}
            borderRadius={'10px'}
            direction={'column'}
          >
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              placeholder="Search"
              size="lg"
              variant={'filled'}
              value={inputValue}
            />
          </Flex>
          <Button mb={'4rem'} isLoading={isLoading} onClick={onSubmitHandler} variant={'outline'} colorScheme={'blue'}>
            Search
          </Button>
          <Stack spacing={10}>
          {paginationSearchedPhones.map((searchedPhone:phonePreview, index)=> {
            return (
              <PhoneCard key={index} phonePreview={searchedPhone} />
            )
          })
          }
        </Stack>
        { showPagin &&
        <Pagination phonesPerPage={phonesPerPage} setCurrentPage={setCurrentPage} totalPhones={searchedPhones?.length}/>
}
          {error.show && (
            <Alert
              mt={'4rem'}
              status="error"
              maxW={'40%'}
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <AlertIcon />
              <AlertTitle>Invalid!</AlertTitle>
              <AlertDescription>
                {error.text}
              </AlertDescription>
            </Alert>
          )}
        </Flex>
      </Flex>
    </>
  );
}
