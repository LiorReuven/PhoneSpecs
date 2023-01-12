import {
  Button,
  Flex,
  HStack,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState} from 'react';

interface PaginationProps  {
  totalPhones: number,
  phonesPerPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  totalPhones,
  phonesPerPage,
  setCurrentPage
}: PaginationProps): JSX.Element => {
  const [active, setActive] = useState('1');

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalPhones / phonesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex
      backgroundColor={'whiteAlpha.200'}
      mt={'2rem'}
      as={'nav'}
      p={4}
      borderRadius={'8px'}
      
    >
      <UnorderedList listStyleType={'none'} display={'flex'} m={0}>
        <HStack spacing={{base:1, md:2}}>
          {pageNumbers?.map((pageNumber, index) => {
            return (
              <ListItem key={index}>
                <Button
                  variant={'outline'}
                  onClick={(event) => {
                   const id = (event.target as HTMLElement).id
                    setCurrentPage(pageNumber)
                    setActive(id);
                  }}
                  id={JSON.stringify(pageNumber)}
                  backgroundColor={(active === JSON.stringify(pageNumber)) ? 'blue.600' : undefined}
                >
                  {pageNumber}
                </Button>
              </ListItem>
            );
          })}
        </HStack>
      </UnorderedList>
    </Flex>
  );
};

export default Pagination;
