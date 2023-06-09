import { doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'

import { usersColRef, postsColRef } from './dbRefs'
import db from '../config'

const getDocDataCb = doc => ({ ...doc.data(), id: doc.id })
const getData = snapshot => snapshot.docs.map(getDocDataCb)

/* NOTE: For getting static data */
const getDocsData = colRef => async () => {
	try {
		const docs = await getDocs(colRef)
		return getData(docs)
	} catch (error) {
		console.log(error)
		return []
	}
}

/* NOTE: For gettting real time data */
const getRealtimeDocsData = colRef => async setData => {
	try {
		return onSnapshot(colRef, async snapshot => {
			const data = await getData(snapshot)
			setData(data)
		})
	} catch (error) {
		console.log(error)
		return []
	}
}

const getUsers = getDocsData(usersColRef)
const getPosts = getDocsData(postsColRef)

const getRealTimePosts = getRealtimeDocsData(postsColRef)

const getSingleDoc = colName => async paths => {
	const docSnap = await getDoc(doc(db, colName, ...paths))

	try {
		if (docSnap.exists) {
			return {
				...docSnap.data(),
				ref: docSnap.ref,
			}
		}
	} catch (error) {
		console.log(error)
	}

	return {}
}

const getSingleUser = getSingleDoc('users')
const getSinglePost = getSingleDoc('posts')

export {
	getUsers,
	getPosts,
	getSingleUser,
	getSinglePost,
	getRealTimePosts,
	getData,
}
