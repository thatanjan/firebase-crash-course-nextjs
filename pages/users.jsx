import { OrderedList, ListItem, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useEffect, useState } from 'react'

import { getUsers } from '../firebase/utils/query'

const Users = () => {
	const [users, setusers] = useState([])

	useEffect(() => {
		;(async () => {
			const data = await getUsers()
			setusers(data)
		})()
	}, [])

	return (
		<div>
			<OrderedList>
				{users.map(user => (
					<ListItem key={user.id}>
						<Link as={NextLink} href={`/user/${user.id}`}>
							{user.name}
						</Link>
					</ListItem>
				))}
			</OrderedList>
		</div>
	)
}

export default Users
