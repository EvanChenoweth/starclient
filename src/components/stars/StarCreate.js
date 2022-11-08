import React, { useState } from 'react' 
import { starCreate } from '../../api/star'
import { useNavigate } from 'react-router-dom'

import StarForm from '../shared/StarForm'

const StarCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultStar = {
        name: '',
        type: '',
        age: '',
        adoptable: false
    }

    const [star, setStar] = useState(defaultStar)

    const handleChange = (e) => {
        // to keep the values as users input info 
        // first spread the current pet
        // then comma and modify the key to the value you need
        // this was fine for the old way of building a pet
        // need new stuff to handle new data types number and boolean
        // setPet({...pet, [event.target.name]: event.target.value})
        setStar(prevStar => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // this handles our number type
            if (e.target.type === 'number') {
                // this looks at the input type and changes from the default type of string to an actual number
                updatedValue = parseInt(e.target.value)
            }

            // now we handle the checkbox
            if (updatedName === "adoptable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "adoptable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedStar = { [updatedName]: updatedValue }

            return { ...prevStar, ...updatedStar }
        })
    }

    const handleCreateStar = (e) => {
        e.preventDefault()
        
        starCreate(star, user)
            .then(res => { navigate(`/stars/${res.data.star.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Create Star',
                    variant: 'success'
                })
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Create Star Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <StarForm
            star={ star }
            handleChange={ handleChange }
            heading="Add a new star!"
            handleSubmit={ handleCreateStar }
        />
	)
}

export default StarCreate