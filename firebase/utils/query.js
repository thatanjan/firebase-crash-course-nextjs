import { getDocs, onSnapshot, query } from 'firebase/firestore'

import { usersColRef, postsColRef } from './dbRefs'

const getDocDataCb = doc => ({ ...doc.data(), id: doc.id })
const getData = snapshot => snapshot.docs.map(getDocDataCb)

/* NOTE: For getting static data */
const getDocsData = colRef => async () => {
	try {
		const snapshot = await getDocs(colRef)
		return getData(snapshot)
	} catch (error) {
		console.log(error)
		return []
	}
}

/* NOTE: For gettting real time data */
/* const getDocsData = colRef => { */
/* 	try { */
/* 		onSnapshot(colRef, async snapshot => getData(snapshot)) */
/* 	} catch (error) { */
/* 		console.log(error) */
/* 		return [] */
/* 	} */
/* } */

const getUsers = getDocsData(usersColRef)
const getPosts = getDocsData(postsColRef)

export { getUsers, getPosts }
