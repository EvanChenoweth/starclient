import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const SandForm = (props) => {
    const {sand, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's the sand name?"
                    name="name"
                    id="name"
                    value= { sand.name }
                    onChange={ handleChange }
                />
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    placeholder="describe the sand..."
                    name="description"
                    id="description"
                    value= { sand.description }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is the sand solid?"
                    name="isSqueaky"
                    defaultChecked={ sand.isSoft }
                    onChange={ handleChange }
                />
                <Form.Select
                    aria-label="sand condition"
                    name="condition"
                    defaultValue={sand.condition}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="new">flat</option>
                    <option value="used">destroyed</option>
                    <option value="disgusting">mix</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default SandForm