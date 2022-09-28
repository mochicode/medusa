import { useCallback, useState, ChangeEvent } from 'react'
import { Product as ProductType } from '@medusajs/medusa'
import { useParams } from 'react-router-dom'
import { useProduct } from 'medusa-react'
import Header from '../../components/header'
import { Price } from '../../components/price'
import Options, { useOptions } from '../../components/options' 

import Styles from './product.module.css'

export let Product = () => {
	let { productId = '' } = useParams<{ productId: string }>()
	
	let { product, isLoading, isError } = useProduct(productId, {
		enabled: productId !== ''
	})

	return (
		<div>
			<Header />

			{ (!product && isError) &&
				<div>Something went wrong 🥺</div>
			}

			{ (!product && isLoading) &&
				<div>⭕ Loading</div>
			}

			{ (product && !isLoading) &&
				<ProductInfo product={product} />
			}
			<pre>
				{ JSON.stringify(product, null, 2) }
			</pre>
		</div>
	)
}

type Props = {
	product: ProductType
}

let ProductInfo = ({ product }: Props) => {
	let [currentSize, setSize] = useInputState('S')
	let sizes = useOptions(product.options, option => option.title === 'Size')

	let [currentColor, setColor] = useInputState('S')
	let colors = useOptions(
		product.options,
		option => option.title === 'Color',
		optionValue => {
			let size = sizes[currentSize]
			if (!size) {
				return false
			}

			let variants = size.map(s => s.variant_id)
			return variants.includes(optionValue.variant_id)
		}
	)

	return (
		<main className={Styles.main}>
			<section>
				<ul className={Styles.images}>
					{ product.images.map(image =>
						<li key={image.id}>
							<img className={Styles.image} src={image.url} />
						</li>
					)}
				</ul>
			</section>

			<section className={Styles.info}>
				<div className={Styles['info-content']}>
					<h1>{ product.title }</h1>
					<Price items={product.variants} />
					<p>{ product.description }</p>

					<Options
						value={currentSize}
						onChange={setSize}
						items={Object.keys(sizes)}
					/>

					<Options
						value={currentColor}
						onChange={setColor}
						items={Object.keys(colors)}
					/>

				</div>
			</section>
		</main>
	)
}

type UseInputState = [
	string,
	(e: ChangeEvent<HTMLSelectElement>) => void,
]

function useInputState(defaultValue: string): UseInputState {
	let [state, set] = useState(defaultValue)

	let setState = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		set(e.target.value)
	}, [set])

	return [state, setState]
}