import { Heading, SimpleGrid } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { getPosts } from '../firebase/utils/query'
import PostCard from '../components/PostCard'

const Home = () => {
	const [data, setdata] = useState([])

	useEffect(() => {
		;(async () => {
			const posts = await getPosts()
			setdata(posts)
		})()
	}, [])
	return (
		<>
			<Heading textAlign='center' textTransform='uppercase' py='3rem'>
				Post
			</Heading>

			<SimpleGrid
				spacing={7}
				templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
			>
				{data.map(item => (
					<PostCard key={item.title} {...item} />
				))}
			</SimpleGrid>
		</>
	)
}

export default Home
