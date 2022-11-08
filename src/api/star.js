import apiUrl from '../apiConfig'
import axios from 'axios'

export const starCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/stars',
		data: {
			star: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const starIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/stars'
	})
}

export const starShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/stars/' + id
	})
}

export const starUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/stars/' + id,
		data: {
			star: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const starDelete = (user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/stars/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}