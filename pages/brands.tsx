import { Flex, Heading, Stack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import BrandCard from '../components/BrandCard';

export type brandPreview = {
  brand_id:number,
  brand_name:string,
  brand_slug:string,
  device_count:number,
  detail:string,
}


type BrandsProps = {
  brands: brandPreview[],
};

export default function Brands({ brands}: BrandsProps): JSX.Element {
  return (
    <>
      <Flex
        maxW={'80%'}
        mx={'auto'}
        alignItems={'center'}
        flexDirection={'column'}
        my={'4rem'}
      >
        <Stack spacing={20}>
          {brands.map((brand:brandPreview, index)=> {
            return (
              <BrandCard key={brand.brand_id} brandPreview={brand} />
            )
          })
          }
        </Stack> 
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.API}/brands`, {
    method: 'GET',
  });
  const data = await response.json();

  const brands: brandPreview[] = data.data;

  return {
    props: {
      brands: brands,
    },
  };
};
