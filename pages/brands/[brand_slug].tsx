import { Flex, Heading, Input, Spinner, Stack } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import PhoneCard from '../../components/PhoneCard';
import { useState } from 'react';
import Pagination from '../../components/Pagination';
import { useRouter } from 'next/router';

export type phonePreview = {
  phone_name: string;
  slug: string;
  image: string;
  detail: string;
  hits?: number;
  favorites?: number;
};

type BrandPageProps = {
  phonesByBrand: phonePreview[];
  title: string;
};

export default function BrandPage({
  phonesByBrand,
  title,
}: BrandPageProps): JSX.Element {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage, setPhonesPerPage] = useState(10);

  const lastPhoneIndex = currentPage * phonesPerPage;
  const firstPhoneIndex = lastPhoneIndex - phonesPerPage;
  const paginationPhonesByBrand = phonesByBrand.slice(
    firstPhoneIndex,
    lastPhoneIndex
  );

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
      <Flex
        maxW={'80%'}
        mx={'auto'}
        alignItems={'center'}
        flexDirection={'column'}
        my={'4rem'}
      >
        <Heading mb={'4rem'}>{title}</Heading>
        <Flex
          mb={'3rem'}
          w={{ md: '50%', base: '100%' }}
          border={'1px solid gray'}
          borderRadius={'10px'}
        >
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Search"
            size="lg"
            variant={'filled'}
          />
        </Flex>
        <Stack spacing={10}>
          {query
            ? phonesByBrand
                ?.filter((phoneByBrand) =>
                  phoneByBrand.phone_name
                    .toLowerCase()
                    .includes(query.toLowerCase())
                )
                .map((phoneByBrand: phonePreview, index) => {
                  return <PhoneCard key={index} phonePreview={phoneByBrand} />;
                })
            : paginationPhonesByBrand
                ?.filter((phoneByBrand) =>
                  phoneByBrand.phone_name
                    .toLowerCase()
                    .includes(query.toLowerCase())
                )
                .map((phoneByBrand: phonePreview, index) => {
                  return <PhoneCard key={index} phonePreview={phoneByBrand} />;
                })}
        </Stack>
        <Pagination
          phonesPerPage={phonesPerPage}
          totalPhones={phonesByBrand.length}
          setCurrentPage={setCurrentPage}
        />
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/brands/${context.params?.brand_slug}`,
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

  const phonesByBrand: phonePreview[] = data.data.phones;
  const title: string = data.data.title;

  return {
    props: {
      phonesByBrand: phonesByBrand,
      title: title,
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
