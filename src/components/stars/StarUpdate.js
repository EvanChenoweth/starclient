import React from 'react'

const StarUpdate = ({ pet, handleChange, handleUpdatePet }) => {
	return (
		<>
			<input 
            type='text' 
            value={pet.name} 
            name='name' 
            onChange={handleChange} 
            />
			<input 
            type='text' 
            value={pet.type} 
            name='type' 
            onChange={handleChange} 
            />
			<button onClick={handleUpdatePet}>Update pet</button>
		</>
	)
}

export default StarUpdate