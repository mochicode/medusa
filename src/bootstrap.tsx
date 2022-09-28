import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient } from 'react-query'
import { MedusaProvider } from 'medusa-react'

let queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      retry: 1,
    },
  },
})

let Products = lazy(() => import('./pages/products'))
let Product = lazy(() => import('./pages/product'))
let Home = lazy(() => import('./pages/home'))

let Bootstrap = () => {
	return (
		<MedusaProvider queryClientProviderProps={{ client: queryClient }} baseUrl='http://localhost:9000'>		
			<Suspense fallback={<div>... loading</div>}>
				<BrowserRouter>
					<Routes>
						<Route path='products/*' element={<Products />} />
						<Route path='product/:productId' element={<Product />} />
						<Route path='/*' element={<Home />} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</MedusaProvider>
	)
}

export default Bootstrap
