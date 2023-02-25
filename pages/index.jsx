import { Heading, Button, HStack } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import { getPosts, getRealTimePosts } from '../firebase/utils/query'

import PostCardList from '../components/PostCardList'
import AddNewDocumentForm from '../components/AddNewDocumentForm'
import { useRouter } from 'next/router'

const Home = () => {
	const [data, setdata] = useState([])
	const { push } = useRouter()

	// For static
	// useEffect(() => {
	// 	;(async () => {
	// 		const posts = await getPosts()
	// 		setdata(posts)
	// 	})()
	// }, [])

	// For real time data
	useEffect(() => {
		;(async () => {
			const unsubscribe = await getRealTimePosts(setdata)

			return unsubscribe
		})()
	}, [])

	return (
		<>
			<Heading textAlign='center' textTransform='uppercase' py='3rem'>
				Posts
			</Heading>

			<HStack variant='solid' spacing='6' mb='3rem'>
				<AddNewDocumentForm />

				<Button onClick={() => push('/users')} colorScheme='blue'>
					Show all users
				</Button>
			</HStack>

			<PostCardList data={data} />
		</>
	)
}

export default Home
