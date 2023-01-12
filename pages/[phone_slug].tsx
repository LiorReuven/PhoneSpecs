import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

type specs = {
  key: string;
  val: string[];
};

type phoneSpecs = {
  brand: string;
  phone_name: string;
  thumbnail: string;
  phone_images: string[];
  release_date: string;
  dimension: string;
  os: string;
  storage: string;
  specifications: { title: string; specs: specs[] }[];
};

type phoneSpecsPageProps = {
  phoneSpecs: phoneSpecs;
};

export default function BrandPage({
  phoneSpecs,
}: phoneSpecsPageProps): JSX.Element {
  const router = useRouter();

  console.log(phoneSpecs);

  if (router.isFallback) {
    return (
      <Flex minH={'80vh'} justifyContent={'center'} alignItems={'center'}>
        <Spinner
          thickness="6px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <>
      <Flex maxW={'80%'} mx={'auto'} direction={'column'} alignItems={'center'}>
        <Flex
          my={'4rem'}
          direction={{ base: 'column', md: 'row' }}
          alignItems={'center'}
          justifyContent={{ md: 'center', base: 'space-evenly' }}
          backgroundColor={'blue.600'}
            p={3}
            borderRadius={'10px'}
            w={'100%'}
        >
          <Flex width={{ base: '70%', md: '50%', lg: '25%' }}>
            <Carousel dynamicHeight={true} showThumbs={false}>
              {phoneSpecs.phone_images.map((phoneImage, index) => {
                return (
                  <div key={index}>
                    <Image src={phoneImage} alt="" objectFit={'cover'} />
                  </div>
                );
              })}
            </Carousel>
          </Flex>
          <Flex
            alignItems={'center'}
            direction={'column'}
            w={'fit-content'}
            ml={{md: '3rem', base: 0}}
            mt={{md:0, base:'2rem'}}
            
          >
            <Stack color={'black'} fontWeight={'semibold'} spacing={3} textAlign={'center'}>
              <Text>{phoneSpecs.brand}</Text>
              <Divider color={'white'} />
              <Text>{phoneSpecs.phone_name}</Text>
              <Divider />
              <Text>{phoneSpecs.release_date}</Text>
              <Divider />
              <Text>{phoneSpecs.dimension}</Text>
              <Divider />
              <Text>{phoneSpecs.os}</Text>
              <Divider />
              <Text>{phoneSpecs.storage}</Text>
            </Stack>
          </Flex>
        </Flex>

        <Flex direction={'column'} border={'2px solid black'}>
          <Text>{phoneSpecs.specifications[0].title}</Text>
        </Flex>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/${context.params?.phone_slug}`,
    {
      method: 'GET',
    }
  );

  const data = await response.json();

  if (!data.status) {
    return {
      notFound: true,
    };
  }

  const phoneSpecs: phoneSpecs = data.data;

  return {
    props: {
      phoneSpecs: phoneSpecs,
    },
    revalidate: 259200,
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
