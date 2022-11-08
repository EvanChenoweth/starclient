import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { starIndex } from '../../api/star'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const StarIndex = ({ user, msgAlert }) => {

    const [allStars, setAllStars] = useState([])

    useEffect(() => {
        starIndex(user)
        .then(res => {
            setAllStars(res.data.stars)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Pets Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const starCards = allStars.map(star => (
        <Card key={ star.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ star.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/stars/${star.id}` }>View { star.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    if (!allStars) {
        return <LoadingScreen />
    }

    return (
        <div className='container-md' style={ cardContainerLayout }>
            { starCards }
        </div>
    )
}

export default StarIndex