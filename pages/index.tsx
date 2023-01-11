import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import PhoneCard from "../components/PhoneCard";


type HomeProps = {
  latestPhones: latestPhone[],
  title: string
}


export default function Home() {

  return (

    <>
    <Flex maxW={'80%'} mx={'auto'}>
    </Flex>
    </>
  )
}



// export const getStaticProps: GetStaticProps = async () => {

//   const response = await fetch('https://phone-specs-api.azharimm.dev/latest', {
//     method: 'GET'
//   })
//   const data = await response.json()

   

//   const latestPhones: latestPhone[] = data.data.phones
//   const title : string = data.data.title

//   return {
//     props: { 
//       latestPhones: latestPhones,
//       title:title
//      }
//   }
// }