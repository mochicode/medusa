import { ProductVariant, Region } from "@medusajs/medusa"
import { formatAmount, useRegions } from "medusa-react"
import { ReactNode, useMemo } from "react"
import { useLocation } from "react-router-dom"

type Items = Array<ProductVariant>

export type PriceProps = {
	items: Items;
	loading?: ReactNode;
}

export let Price = ({ items, loading }: PriceProps) => {
	let price = usePrice(items)

	if (!price) {
		return (
			<span className="medusa-price--loading">
				{ loading ?? '...' }
			</span>
		)
	}

	return (
		<span className="medusa-price--loading">
			{ price }
		</span>
	)
}


function useRegion(): Region | undefined {
	let { regions = [] } = useRegions()
	let { search } = useLocation()
	let params = useMemo(() => new URLSearchParams(search), [search])
	let region = params.get('region') ?? 'EU'
	return regions.find(r => r.name === region)
}

function getPrice(items: Items, region?: Region): string | undefined {
	let price = items[0]?.prices[0]

	if (!region || !price) {
		return undefined
	}

	return formatAmount({
		amount: price.amount,
		region: {
			currency_code: region.currency_code ?? 'EUR',
			tax_code: region?.tax_code ?? '',
			tax_rate: region?.tax_rate ?? 0,
		}
	})
}

export function usePrice(items: Items): string | undefined {
	let region = useRegion()
	let price = useMemo(() => getPrice(items, region), [region, items])
	return price
}
