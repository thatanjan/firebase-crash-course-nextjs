import { useRouter } from 'next/router'
import React from 'react'

const PostPage = ({}) => {
	const {
		query: { id },
	} = useRouter()

	console.log(id)

	return <div>{id}</div>
}

export default PostPage
