import {
	Heading,
	Box,
	Card,
	CardHeader,
	Button,
	Text,
	CardBody,
	CardFooter,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getSinglePost } from '../../firebase/utils/query.js'
import { useState, useEffect } from 'react'

const PostPage = ({}) => {
	const [postData, setPostData] = useState({})

	const {
		query: { id },
	} = useRouter()

	useEffect(() => {
		if (!id) return undefined
		;(async () => {
			const postSnap = await getSinglePost([id])
			setPostData(postSnap.data())
		})()
	}, [id])

	const { title, content } = postData

	return (
		<>
			<Heading textAlign='center' textTransform='uppercase' py='3rem'>
				Post
			</Heading>

			<Card maxW='500px' m='0 auto'>
				<CardHeader>
					<Heading size='md'>{title}</Heading>
				</CardHeader>
				<CardBody>
					<Text>{content}</Text>
				</CardBody>
				<CardFooter>
					<Button>Edit</Button>
				</CardFooter>
			</Card>
		</>
	)
}

export default PostPage
