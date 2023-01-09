import {
	Heading,
	Card,
	CardHeader,
	CardBody,
	Text,
	CardFooter,
	Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

const PostCard = ({ title, content, id }) => {
	const { push } = useRouter()
	return (
		<Card>
			<CardHeader>
				<Heading size='md'>{title}</Heading>
			</CardHeader>
			<CardBody>
				<Text noOfLines={3}>{content}</Text>
			</CardBody>
			<CardFooter>
				<Button onClick={() => push('/post/' + id)}>Go to Post</Button>
				<Button>Delete</Button>
			</CardFooter>
		</Card>
	)
}

export default PostCard
