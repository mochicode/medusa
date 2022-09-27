import { Link } from 'react-router-dom'

export let Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<Link to='/products'>Products</Link>
		</div>
	)
}
