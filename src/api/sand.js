import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createSand = (user, starId, newSand) => {
    console.log('the user in createSand', user)
    console.log('the newSand in createSand', newSand)
	return axios({
		url: `${apiUrl}/sands/${starId}`,
		method: 'POST',
		data: { sand: newSand }
	})
}

// UPDATE toy
export const updateSand = (user, starId, updatedSand) => {
    console.log('this is updatedSand', updatedSand)
	return axios({
		url: `${apiUrl}/sands/${starId}/${updatedSand._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { sand: updatedSand }
	})
}

// DELETE toy
export const deleteSand = (user, starId, sandId) => {
	return axios({
		url: `${apiUrl}/sands/${starId}/${sandId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}