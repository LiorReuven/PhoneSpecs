import { Flex, Grid, GridItem,  Input,} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import BrandCard from '../../components/BrandCard';

export type brandPreview = {
  brand_id: number;
  brand_name: string;
  brand_slug: string;
  device_count: number;
  detail: string;
};

type BrandsProps = {
  brands: brandPreview[];
};

export default function Brands({ brands }: BrandsProps): JSX.Element {
  const [query, setQuery] = useState('');


  return (
    <>
      <Flex
        maxW={'80%'}
        mx={'auto'}
        alignItems={'center'}
        flexDirection={'column'}
        my={'3rem'}
      >
        <Flex
          my={'3rem'}
          w={{md:'50%', base:'100%'}}
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
        <Grid
          templateColumns={{
            md: 'repeat(1, 1fr)',
            base: 'repeat(1, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={20}
        >
          {/* <Stack direction={'row'} flexWrap={'wrap'} spacing={20} justifyContent={'center'}> */}
          {brands
            .filter((brand) => brand.brand_name.toLowerCase().includes(query.toLowerCase()))
            .map((brand: brandPreview) => {
              return (
                <GridItem key={brand.brand_id}>
                  <BrandCard brandPreview={brand} />
                </GridItem>
              );
            })}
          {/* </Stack>  */}
        </Grid>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/brands`, {
    method: 'GET',
  });
  const data = await response.json();

  const brands: brandPreview[] = data.data;

  return {
    props: {
      brands: brands,
    },
    revalidate: 259200,
  };
};
