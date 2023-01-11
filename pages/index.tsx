import { Flex } from "@chakra-ui/react";
import { GetStaticProps,InferGetStaticPropsType } from "next";
import PhoneCard from "../components/PhoneCard";

export type latestPhone = {
  phone_name: string,
  slug: string,
  image: string,
  detail: string
}

type HomeProps = {
  latestPhones: latestPhone[]
}


export default function Home({latestPhones}: HomeProps) {

  console.log(latestPhones)
  return (

    <>
    <Flex maxW={'80%'} mx={'auto'}>
      <PhoneCard/>
    </Flex>
    </>
  )
}



export const getStaticProps: GetStaticProps = async () => {

  const response = await fetch('https://phone-specs-api.azharimm.dev/latest', {
    method: 'GET'
  })
  const data = await response.json()

   

  const latestPhones: latestPhone[] = data.data.phones

  return {
    props: { 
      latestPhones: latestPhones
     }
  }
}