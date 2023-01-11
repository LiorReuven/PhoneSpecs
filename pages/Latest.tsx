import { Flex, Heading, Stack } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import PhoneCard from '../components/PhoneCard';

export type phonePreview = {
  phone_name: string;
  slug: string;
  image: string;
  detail: string;
  hits?:number,
  favorites?:number
};

type LatestProps = {
  latestPhones: phonePreview[],
  title: string;
};

export default function Latest({ latestPhones, title }: LatestProps): JSX.Element {
  console.log(latestPhones);
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
        <Stack spacing={10}>
          {latestPhones.map((latestPhone:phonePreview, index)=> {
            return (
              <PhoneCard key={index} phonePreview={latestPhone} />
            )
          })
          }
        </Stack>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.API}/latest`, {
    method: 'GET',
  });
  const data = await response.json();

  const latestPhones: phonePreview[] = data.data.phones;
  const title: string = data.data.title;

  return {
    props: {
      latestPhones: latestPhones,
      title: title,
    },
  };
};
