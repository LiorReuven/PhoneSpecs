import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import PhoneCard from '../components/PhoneCard';
import { phonePreview } from './Latest';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [searchedPhones, setSearchedPhones] = useState<phonePreview[]>([]);
  const [error, setError] = useState(false)  
  const [isLoading, setisLoading] = useState(false)  

  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      (inputValue === '') ||
     (inputValue.match(/[^A-Za-z0-9]+/g))
    ) {
      return setError(true)
    }

    setInputValue('')
  };

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
            my={'3rem'}
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
          <Button variant={'outline'} colorScheme={'blue'}>
            Search
          </Button>
          { error &&
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Invalid Search!</AlertTitle>
            <AlertDescription>
              No empty search or special characters allowed.
            </AlertDescription>
          </Alert>
}
        </Flex>
      </Flex>
    </>
  );
}
