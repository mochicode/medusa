import { ReactNode } from 'react';
import Styles from './product_preview.module.css'

export type Props = {
	image: ReactNode;
	title: string;
	price: ReactNode;
}

export let ProductPreview = ({ image, title, price }: Props) => {
	return (
		<div className={Styles.wrapper}>
			{ typeof image === 'string'
				? <img className={Styles.image} src={image} />
				: image
			}
			
			<div className={Styles['text-content']}>
				<span className={Styles.title}>{ title }</span>
				<span>{ price }</span>
			</div>
		</div>
	)
}
