import { SelectHTMLAttributes } from 'react'
import { ProductOption, ProductOptionValue } from '@medusajs/medusa'

type GetFn = (value: ProductOption) => boolean

let NoOp = () => true
type FilterFn = (value: ProductOptionValue) => boolean

type UseOptions = Record<string, Array<ProductOptionValue>>

export function useOptions(
	options: Array<ProductOption>,
	get: GetFn,
	filter: FilterFn = NoOp,
): UseOptions {
	let option = options.find(get)

	if (!option) {
		return {}
	}

	return option
		.values
		.filter(filter)
		.reduce((acc: UseOptions, x) => {
			if (!acc[x.value]) {
				acc[x.value] = []
			}

			acc[x.value].push(x)
			return acc
		}, {})
}

type Props = SelectHTMLAttributes<HTMLSelectElement> &  {
	items: Array<string>;
}

export let Options = ({ items, ...props }: Props) => {
	return (
		<select {...props}>
			{ items.map(key => <option key={key} value={key}>{ key }</option>) }
		</select>
	)
}
