import { SimpleGrid } from '@chakra-ui/react'

import PostCard from './PostCard'

const PostCardList = ({ data }) => {
	return (
		<SimpleGrid
			spacing={7}
			templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
		>
			{data.map(item => (
				<PostCard key={item.title} {...item} />
			))}
		</SimpleGrid>
	)
}

export default PostCardList
