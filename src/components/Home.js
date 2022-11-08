import React, { useState, useEffect } from 'react'
import PetIndex from "./stars/StarIndex"
import images from './shared/images'

const Home = (props) => {
	const { msgAlert } = props

	return (
		<div className='container-md'>
			<img src={`${images.cat}`}/>
			<img src={`${images.dog}`}/>
			<h2>All the stars</h2>
			<PetIndex msgAlert={msgAlert}/>
		</div>
	)
}

export default Home
