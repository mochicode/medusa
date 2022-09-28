import { Product } from '@medusajs/medusa'
import { Link } from 'react-router-dom'
import ProductPreview from '../product_preview'
import Styles from './product_grid.module.css'
import { Price } from '../price'
import Thumbnail from '../thumbnail'

export type Props = {
	items: Array<Product>
}

export let ProductGrid = ({ items }: Props) => {
	return (
		<ul className={Styles.list}>
			{ items.map(product => {
				let image = (
					<Thumbnail
						thumbnail={product.thumbnail}
						images={product.images}
					/>
				)
				
				return (
					<li key={product.id}>
						<Link to={`/product/${product.id}`}>
							<ProductPreview
								title={product.title}
								image={image}
								price={<Price items={product.variants} />}
							/>
						</Link>
					</li>
				)
			}) }
		</ul>
	)
}
