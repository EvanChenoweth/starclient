import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteSand } from '../../api/sand'
import EditSandModal from './EditSandModal'
import NewSandModal from './NewSandModal'

const ShowSand = (props) => {
    const { sand, star, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editModalShow, setEditModalShow] = useState(false)

    // this will set the color of the card based on the condition
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({ width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({ width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({ width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // this function removes a toy, is only available to pet owner
    const destroySand = () => {
        deleteSand(user, star._id, sand._id)
            .then(() => {
                msgAlert({
                    heading: 'Toy deleted!',
                    message: 'Bye Bye toy!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(sand.condition)}>
                <Card.Header>{ sand.name }</Card.Header>
                <Card.Body>
                    <small>{ sand.description }</small><br/>
                    <small>
                        { sand.isSoft ? 'squeak squeak' : 'stoic silence'}
                    </small><br/>
                    <small>Condition: { sand.condition }</small>
                </Card.Body>
                <Card.Footer>
                    { 
                        user && star.owner && user._id === star.owner._id 
                        ?
                        <>
                            <Button
                                className="m-2" 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}  
                            >
                                Edit Sand
                            </Button>
                            <Button 
                                className="m-2"
                                variant="danger"
                                onClick={() => destroySand()}
                            >
                                Delete Sand
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditSandModal 
                user={user}
                star={star}
                sand={sand}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowSand