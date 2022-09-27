import { render, screen } from '@testing-library/react'
import { Products } from './products'

test('renders Products', () => {
  render(<Products />)
  const title = screen.getByText(/Products/i)
  expect(title).toBeInTheDocument()
})
