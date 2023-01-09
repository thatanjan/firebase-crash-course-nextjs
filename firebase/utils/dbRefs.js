import { collection } from 'firebase/firestore'

import db from '../config'

const usersColRef = collection(db, 'users')
const postsColRef = collection(db, 'posts')

export { usersColRef, postsColRef }
