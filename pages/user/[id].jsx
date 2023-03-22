import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Heading } from '@chakra-ui/react'
import { query, where, getDocs } from 'firebase/firestore'

import { getData, getSingleUser } from '../../firebase/utils/query'
import { postsColRef } from '../../firebase/utils/dbRefs'

import PostCardList from '../../components/PostCardList'

const User = () => {
	const [postsData, setPostsData] = useState([])
	const [userData, setUserData] = useState({})

	const {
		query: { id },
	} = useRouter()

	useEffect(() => {
		;(async () => {
			if (!id) return

			const data = await getSingleUser([id])
			setUserData(data)

			const snapShots = await getDocs(
				query(postsColRef, where('user', '==', data.ref))
			)
			setPostsData(getData(snapShots))
		})()
	}, [id])

	console.log(postsData)

	return (
		<div>
			<Heading textAlign='center' py='3rem'>
				{userData.name}
			</Heading>

			<PostCardList data={postsData} />
		</div>
	)
}

export default User
