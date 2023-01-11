import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { phonePreview } from "../pages/Latest"

type PhoneCardProps = {
  phonePreview: phonePreview
}


const PhoneCard = ({phonePreview}: PhoneCardProps): JSX.Element => {
  return (
    <Box>
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
 border={'2px solid'}
>
  { phonePreview.image &&
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={phonePreview.image}
    alt='Caffe Latte'
  />
}

  <Stack width={'100%'}   >
    <CardBody >
      <Heading textAlign={'center'} size='md'>{phonePreview.phone_name}</Heading>
    </CardBody>

    <CardFooter  justifyContent={'center'}>
      <Button variant='solid' colorScheme='blue'>
        Specs
      </Button>
    </CardFooter>
  </Stack>
</Card>
</Box>
  )
}

export default PhoneCard