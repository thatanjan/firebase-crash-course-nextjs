import {
	Heading,
	Card,
	CardHeader,
	Text,
	CardBody,
	CardFooter,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getSinglePost } from '../../firebase/utils/query.js'
import { useState, useEffect } from 'react'

import EditDocumentForm from '../../components/EditDocumentForm'

const PostPage = ({}) => {
	const [postData, setPostData] = useState({})

	const [postDocRef, setpostDocRef] = useState({})

	const {
		query: { id },
	} = useRouter()

	useEffect(() => {
		if (!id) return undefined
		;(async () => {
			const postSnap = await getSinglePost([id])
			setPostData(postSnap.data())
			setpostDocRef(postSnap.ref)
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
					{postData.title && (
						<EditDocumentForm postDocRef={postDocRef} postData={postData} />
					)}
				</CardFooter>
			</Card>
		</>
	)
}

export default PostPage
