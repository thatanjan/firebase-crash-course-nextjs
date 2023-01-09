import { Heading, SimpleGrid } from '@chakra-ui/react'

import PostCard from '../components/PostCard'

const Home = () => {
	return (
		<>
			<Heading textAlign='center' textTransform='uppercase' py='3rem'>
				Post
			</Heading>

			<SimpleGrid
				spacing={4}
				templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
			>
				{[].map(item => (
					<PostCard key={item.title} {...item} />
				))}
			</SimpleGrid>
		</>
	)
}

export default Home
