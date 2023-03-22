import {
	Button,
	Modal,
	FormControl,
	FormLabel,
	Input,
	ModalFooter,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	chakra,
} from '@chakra-ui/react'
import { useState } from 'react'

import { updatePost } from '../firebase/utils/mutate'

const EditDocumentForm = ({ postData, postDocRef }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [formData, setFormData] = useState({
		...postData,
		tags: postData.tags.join(', '),
	})

	const handleInputChange = event => {
		const {
			target: { name, value },
		} = event

		const changedData = {
			...formData,
			[name]: value,
		}

		setFormData(changedData)
	}

	const handleSubmit = async event => {
		event.preventDefault()

		let tags = formData.tags.split(',').map(tag => tag.trim().toLowerCase())
		if (!tags.at(-1)) tags.pop()
		tags = [...new Set(tags)]

		const newFormData = { ...formData, tags }
		const hasEdited = await updatePost(postDocRef, newFormData)

		if (hasEdited) {
			onClose()
		}
	}

	return (
		<>
			<Button onClick={() => onOpen(true)}>Edit</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<chakra.form onSubmit={handleSubmit}>
					<ModalContent>
						<ModalHeader>Edit Document</ModalHeader>
						<ModalCloseButton />

						<ModalBody pb={6}>
							<FormControl>
								<FormLabel>Title</FormLabel>
								<Input
									name='title'
									value={formData.title}
									onChange={handleInputChange}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Content</FormLabel>
								<Input
									name='content'
									value={formData.content}
									onChange={handleInputChange}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Tags</FormLabel>
								<Input
									name='tags'
									value={formData.tags}
									onChange={handleInputChange}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button type='submit' colorScheme='blue' mr={3}>
								Edit
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</chakra.form>
			</Modal>
		</>
	)
}

export default EditDocumentForm
