import React from 'react'
import { Container } from 'react-bootstrap'
import ProductDetails from '~/components/ProductDetails/ProductDetails'

const ProductDetailsPage = () => {
  return (
    <Container className='py-3'>
      <ProductDetails />
    </Container>
  )
}

export default ProductDetailsPage
