import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { starDelete, starShow } from '../../api/star'
// import PetUpdate from './PetUpdate' <--no longer using in lieu of the modal
import EditStarModal from './EditStarModal'
import NewSandModal from '../sands/NewSandModal'
import ShowSand from '../sands/ShowSand'
import LoadingScreen from '../shared/LoadingScreen'
import { updateStarSuccess, updateStarFailure } from '../shared/AutoDismissAlert/messages'
import images from '../shared/images'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const StarShow = ({ user, msgAlert }) => {

    const [star, setStar] = useState(null)
    // const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [sandModalShow, setSandModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        starShow(user, id)
            .then((res) => {
                setStar(res.data.star)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Star Failure' + error,
                    variant: 'danger'
                })
            })
    }, [updated])

    const handleDeleteStar = () => {
        starDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Star',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Star Failure' + error,
                variant: 'danger'
            })
        })
    }

    let starCards
    if (star) {
        if (star.sand.length > 0) {
            // map over the toys
            // produce one ShowToy component for each of them
            starCards = star.sand.map(sand => (
                <ShowSand 
                    key={sand._id}
                    sand={sand}
                    star={star}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    // logical &&
    // both sides of this check NEED to be truthy values = true
    // logical ||
    // only one side of this check needs to be truthy = true

    // oneliner
    if (deleted) navigate('/stars')
    // if (deleted) {
    //     navigate('/pets')
    // }

    if (!star) {
        return <LoadingScreen />
    }

    return (
        <>
			<Container className="fluid">
                <Card>
                <Card.Header>{ star.fullTitle }</Card.Header>
                <Card.Body>
                    { 
                        star.type === "dog" 
                        ?
                        <Card.Img variant="top" src={`${images.dog}`}/>
                        :
                        null
                    }
                    { 
                        star.type === "cat" 
                        ?
                        <Card.Img variant="top" src={`${images.cat}`}/>
                        :
                        null
                    }
                    <Card.Text>
                        <small>Age: { star.age }</small><br/>
                        <small>Type: { star.type }</small><br/>
                        <small>
                            Adoptable?: { star.adoptable ? 'yes' : 'no' }
                        </small><br/>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setSandModalShow(true)}
                        className="m-2" variant="info"
                    >
                        Give {star.name} a sand!
                    </Button>
                    { 
                        star.owner && user && star.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                Edit Star
                            </Button>
                            <Button onClick={() => handleDeleteStar()}
                                className="m-2"
                                variant="danger"
                            >
                                Set { star.name } Free
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
                    {/* <h3>Name: {pet.name}</h3>
                    <p>Type: {pet.type}</p>
                    <button onClick={toggleShowUpdate}>Toggle Update</button>
                    {isUpdateShown && (
                        <PetUpdate
                            pet={pet}
                            handleChange={handleChange}
                            handleUpdatePet={handleUpdatePet}
                        />
                    )}
                    <button onClick={handleDeletePet} >Delete</button> */}
                </Card>
            <h3>All of {star.name}'s sands:</h3>
            </Container>
            <Container style={cardContainerLayout}>
                { starCards }
            </Container>
            <EditStarModal 
                user={user}
                star={star}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
            <NewSandModal 
                user={user}
                star={star}
                show={sandModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setSandModalShow(false)}
            />
        </>
    )
}

export default StarShow