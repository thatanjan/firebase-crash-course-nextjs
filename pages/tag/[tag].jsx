import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Heading } from '@chakra-ui/react'
import { query, where, getDocs } from 'firebase/firestore'

import { getData, getSingleUser } from '../../firebase/utils/query'
import { postsColRef } from '../../firebase/utils/dbRefs'

import PostCardList from '../../components/PostCardList'

const TagPage = () => {
	const [postsData, setPostsData] = useState([])

	const {
		query: { tag },
	} = useRouter()

	useEffect(() => {
		;(async () => {
			if (!tag) return

			const snapShots = await getDocs(
				query(postsColRef, where('tags', 'array-contains', tag))
			)
			setPostsData(getData(snapShots))
		})()
	}, [tag])

	return (
		<div>
			<Heading textAlign='center' py='3rem'>
				{tag && `Post with a ${tag} tag`}
			</Heading>

			<PostCardList data={postsData} />
		</div>
	)
}

export default TagPage
