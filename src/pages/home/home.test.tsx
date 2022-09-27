import { render, screen } from '@testing-library/react'
import { Home } from './home'
import { MemoryRouter } from 'react-router-dom'

test('renders home', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
  const title = screen.getByText(/Home/i)
  expect(title).toBeInTheDocument()
})
