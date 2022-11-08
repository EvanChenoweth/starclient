import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SandForm from '../shared/SandForm'
import { createSand } from '../../api/sand'

const NewSandModal = (props) => {
    const { 
        user, star, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [sand, setSand] = useState({})

    const handleChange = (e) => {
        setSand(prevSand => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            if (name === "isSoft" && e.target.checked) {
                value = true
            } else if (name === "isSoft" && !e.target.checked) {
                value = false
            }

            const updatedSand = { [name]: value }

            return {
                ...prevSand, ...updatedSand
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createSand(user, star._id, sand)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'Great! The pet loves it!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton />
            <Modal.Body>
                <SandForm 
                    sand={sand}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this pet a toy!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewSandModal