import { Heading } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { getPosts } from '../firebase/utils/query'
import PostCardList from '../components/PostCardList'

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
			<PostCardList data={data} />
		</>
	)
}

export default Home
