import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { brandPreview } from "../pages/brands"


type BrandCardProps = {
  brandPreview: brandPreview
}


const BrandCard = ({brandPreview}: BrandCardProps): JSX.Element => {
  return (
    <Box>
<Link href={'/'}><Heading size={'2xl'} textAlign={'center'}>{brandPreview.brand_name}</Heading></Link>
</Box>
  )
}

export default BrandCard