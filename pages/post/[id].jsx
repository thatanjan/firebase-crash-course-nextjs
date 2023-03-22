import {
	Heading,
	Card,
	CardHeader,
	Text,
	CardBody,
	CardFooter,
	HStack,
	Tag,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { getSinglePost } from '../../firebase/utils/query.js'
import { useState, useEffect } from 'react'
import Link from 'next/link.js'

import EditDocumentForm from '../../components/EditDocumentForm'
import { onSnapshot } from 'firebase/firestore'

const PostPage = ({}) => {
	const [postData, setPostData] = useState({})
	const [postDocRef, setpostDocRef] = useState({})

	const {
		query: { id },
	} = useRouter()

	useEffect(() => {
		if (!id) return

		let unsubscribe = () => {}

		;(async () => {
			const data = await getSinglePost([id])
			setPostData(data)
			setpostDocRef(data.ref)

			if (data.ref) {
				unsubscribe = onSnapshot(data.ref, doc => setPostData(doc.data()))
			}
		})()

		return unsubscribe
	}, [id])

	const { title, content, tags } = postData

	return (
		<>
			<Card maxW='500px' m='0 auto'>
				<CardHeader>
					<Heading size='md'>{title}</Heading>
				</CardHeader>
				<CardBody>
					<Text>{content}</Text>

					<HStack alignItems='flex-start' flexWrap='wrap' spacing={4} mt={4}>
						{tags?.map(tag => (
							<Tag
								as={Link}
								href={`/tag/${tag}`}
								size='lg'
								key={tag}
								variant='solid'
								colorScheme='teal'
								mb={2}
							>
								{tag}
							</Tag>
						))}
					</HStack>
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
