import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import db from '../config'
import { usersColRef, postsColRef } from './dbRefs'

const addData = async (ref, inputData) => {
	try {
		await addDoc(ref, inputData)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

const addUser = inputData => addData(usersColRef, inputData)
const addPost = inputData => addData(postsColRef, inputData)

const deletePost = async docId => {
	try {
		const docRef = doc(db, 'posts', docId)
		await deleteDoc(docRef)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

const updatePost = async (postDocRef, postInput) => {
	try {
		await updateDoc(postDocRef, postInput)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { addUser, addPost, deletePost, updatePost }
