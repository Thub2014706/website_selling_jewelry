import React from 'react'
import { Container } from 'react-bootstrap'
import ProductDetails from '~/components/ProductDetails/ProductDetails'
import ProductRandom from '~/components/ProductRandom/ProductRandom'

const ProductDetailsPage = () => {
  return (
    <Container fluid className='py-3'>
      <ProductDetails />
      <ProductRandom />
    </Container>
  )
}

export default ProductDetailsPage
