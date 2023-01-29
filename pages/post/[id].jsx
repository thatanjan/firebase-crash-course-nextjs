import { useRouter } from 'next/router'
import React from 'react'

const PostPage = ({}) => {
	const {
		query: { id },
	} = useRouter()

	return <div>{id}</div>
}

export default PostPage
