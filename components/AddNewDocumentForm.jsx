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
	Select,
	chakra,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { getUsers } from '../firebase/utils/query'
import { addPost } from '../firebase/utils/mutate'
import { doc } from 'firebase/firestore'
import db from '../firebase/config'

const initialFormValue = { title: '', content: '', user: '', tags: [] }

const AddNewDocumentForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [users, setusers] = useState([])
	const [formData, setFormData] = useState(initialFormValue)

	useEffect(() => {
		;(async () => {
			const data = await getUsers()
			setusers(data)
		})()
	}, [])

	const handleInputChange = event => {
		let value = event.target.value
		const key = event.target.name

		if (key === 'tags') {
			const tags = value.split(',').map(tag => tag.trim().toLowerCase())
			value = [...new Set(tags)]
		}

		const changedData = {
			...formData,
			[key]: value,
		}

		setFormData(changedData)
	}

	const handleSubmit = async event => {
		event.preventDefault()
		const newFormData = { ...formData, user: doc(db, 'users', formData.user) }
		const hasAdded = await addPost(newFormData)

		if (hasAdded) {
			setFormData(initialFormValue)
			onClose()
		}
	}

	return (
		<>
			<Button onClick={onOpen} colorScheme='blue'>
				Add
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<chakra.form onSubmit={handleSubmit}>
					<ModalContent>
						<ModalHeader>Add a new Document</ModalHeader>
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
									value={formData.tags.join(', ')}
									onChange={handleInputChange}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>User</FormLabel>
								<Select
									size='md'
									name='user'
									value={formData.user}
									onChange={handleInputChange}
									placeholder='Select User'
								>
									{users.map(user => (
										<option key={user.id} value={user.id}>
											{user.name}
										</option>
									))}
								</Select>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button type='submit' colorScheme='blue' mr={3}>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</chakra.form>
			</Modal>
		</>
	)
}

export default AddNewDocumentForm
