import React from 'react'
import {
	Heading,
	Card,
	CardHeader,
	CardBody,
	Text,
	CardFooter,
	Button,
	HStack,
	Tag,
} from '@chakra-ui/react'
import Link from 'next/link.js'
import { useRouter } from 'next/router'
import { deletePost } from '../firebase/utils/mutate'

const PostCard = ({ title, content, id, tags }) => {
	const { push } = useRouter()
	return (
		<Card>
			<CardHeader>
				<Heading size='md'>{title}</Heading>
			</CardHeader>
			<CardBody>
				<Text noOfLines={3}>{content}</Text>

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
				<Button mr='2' onClick={() => push('/post/' + id)}>
					Go to Post
				</Button>
				<Button onClick={() => deletePost(id)}>Delete</Button>
			</CardFooter>
		</Card>
	)
}

export default PostCard
