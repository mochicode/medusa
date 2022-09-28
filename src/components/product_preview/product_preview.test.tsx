import { render, screen } from '@testing-library/react'
import { ProductPreview } from './product_preview'

test('renders ProductPreview', () => {
  render(<ProductPreview title="Awesome Item" image={''} price='' />)
  const title = screen.getByText(/Awesome Item/i)
  expect(title).toBeInTheDocument()
})
