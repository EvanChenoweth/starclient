import { Form, Button, Container } from 'react-bootstrap'

const StarForm = (props) => {
    // here are the props we're going to bring into our form
    const { star, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's your star's name?"
                    name="name"
                    id="name"
                    value= { star.name }
                    onChange={ handleChange }
                />
                <Form.Label>Type:</Form.Label>
                <Form.Control 
                    placeholder="what's type of star?"
                    name="type"
                    id="type"
                    value= { star.type }
                    onChange={ handleChange }
                />
                <Form.Label>Age:</Form.Label>
                <Form.Control 
                    placeholder="How old is your star?"
                    type="number"
                    name="age"
                    id="age"
                    value= { star.age }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is this star adoptable?"
                    name="adoptable"
                    defaultChecked={ star.adoptable }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default StarForm