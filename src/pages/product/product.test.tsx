import { render, screen } from '@testing-library/react'
import { Product } from './product'

test('renders Product', () => {
  render(<Product />)
  const title = screen.getByText(/Product/i)
  expect(title).toBeInTheDocument()
})
