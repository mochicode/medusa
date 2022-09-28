import { useProducts } from 'medusa-react'
import ProductGrid from '../../components/product_grid'
import Header from '../../components/header'

import Styles from './products.module.css'

export let Products = () => {
	let { products = [] } = useProducts()

	return (
		<div>
			<Header />

			<main className={Styles.main}>
				<ProductGrid items={products} />
			</main>
		</div>
	)
}
