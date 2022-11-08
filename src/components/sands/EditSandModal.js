import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import SandForm from '../shared/SandForm'
import { updateSand } from '../../api/sand'
import messages from '../shared/AutoDismissAlert/messages'


const EditSandModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, star 
    } = props

    const [sand, setSand] = useState(props.sand)

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
        
        updateSand(user, star._id, sand)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.updateToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: messages.updateToyFailure + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <SandForm 
                    sand={sand}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give this star a sand!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditSandModal