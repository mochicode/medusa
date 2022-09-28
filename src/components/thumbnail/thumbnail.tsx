import { ImgHTMLAttributes } from 'react'
import { Product } from '@medusajs/medusa'
import Styles from './thumbnail.module.css'

type Props
	= Pick<Product, 'thumbnail' | 'images'>
	& ImgHTMLAttributes<HTMLImageElement>
	& {
		fallback?: string;
	}

export let Thumbnail = ({
	thumbnail,
	images,
	fallback = '',
	className = '',
	...props
}: Props) => {
	let imageUrl = thumbnail ?? images[0]?.url ?? fallback 

	return (
		<img
			className={`medusa-thumbnail ${Styles.thumbnail} ${className}`}
			src={imageUrl}
			{...props}
		/>
	)
}
