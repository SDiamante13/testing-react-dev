import React from 'react'
import { axe } from 'jest-axe'
import { render, screen } from '@testing-library/react'
import ProductTile from '../../../components/ProductTile'

describe('The <ProductTile /> component', () => {

  const defaultProductProps = {
    id: 1,
    image: 'shoes.png',
    name: 'Shoes',
    price: '42.00',
    brand: 'Nike',
    createdAt: '11/01/20',
    isActive: true,
    isNew: true,
    isSoldOut: false,
    priceUnformatted: 42.00
  }

  const setupProductTile = (props = defaultProductProps) => render(<ProductTile {...props}/>)

  it('should match snapshot', () => {
    const { asFragment } = setupProductTile();

    expect(asFragment).toMatchSnapshot();
  })

  it('renders a product tile with name, image and price', () => {
    setupProductTile();

    screen.getByText(defaultProductProps.name);
    screen.getByText(defaultProductProps.price);
    screen.getByAltText(defaultProductProps.name);
  })

  it('renders a product tile with name and price only', () => {
    setupProductTile({
      ...defaultProductProps,
      image: undefined
    });

    screen.getByText(defaultProductProps.name);
    screen.getByText(defaultProductProps.price);
    expect(screen.queryByTestId('ProductTileImage')).toBeNull();
  })

  it('has no accessibility violations', async () => {
    const {container} = setupProductTile();

    expect(await axe(container)).toHaveNoViolations();
  })
})
