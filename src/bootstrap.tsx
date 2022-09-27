import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

let Products = lazy(() => import('./pages/products'))
let Product = lazy(() => import('./pages/product'))
let Home = lazy(() => import('./pages/home'))

let Bootstrap = () => {
	return (
		<Suspense fallback={<div>... loading</div>}>
			<BrowserRouter>
				<Routes>
					<Route path='products/*' element={<Products />} />
					<Route path='product/*' element={<Product />} />
					<Route path='/*' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</Suspense>
	)
}

export default Bootstrap
