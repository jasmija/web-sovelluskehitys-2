
import React, { useState } from 'react'
import axios from "axios";
import { Form, Button} from "react-bootstrap";

const Add = () => {

    const [newEvent, setNewEvent] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newPlace, setNewPlace] = useState("")
    const [validated, setValidate] = useState(false)

    const addEvent = event => {
        event.preventDefault()
        
        const form = event.currentTarget;
        if(form.checkValidity() === false){
            event.stopPropagation();
        }
        setValidate(true);
        if(form.checkValidity() === false){
            return
        }

        console.log("button clicked", event.target);
        const eventObject = {
            name: newEvent,
            date: newDate,
            place: newPlace,
        }
        console.log(eventObject);

        axios
            .post('http://localhost:3001/events', eventObject)
            .then(response => {
                setNewEvent('')
                setNewDate('')
                setNewPlace('')
                reset()
                console.log(response)

            })
    }

    const handleEventChange = (event) => {
        console.log(event.target.value)
        setNewEvent(event.target.value)
    }

    const handleEventChangeDate = (event) => {
        console.log(event.target.value)
        setNewDate(event.target.value)
    }

    const handleEventChangePlace = (event) => {
        console.log(event.target.value)
        setNewPlace(event.target.value)
    }

    const reset = () => {
        setValidate(false)
    }

    return (
        //Ilman bootstrappia
        /*<form onSubmit={addEvent}>
            <label>
                Name:
                <br/>
                <input value={newEvent} onChange={handleEventChange} type="text"/>
            </label>
            <br/>
            <label>
                Date:
                <br/>
                <input value={newDate} onChange={handleEventChangeDate} type="text"/>
            </label>
            <br/>
            <label>
                Place:
                <br/>
                <input value={newPlace} onChange={handleEventChangePlace} type="text"/>
            </label>
            <br/>
            <input type="submit" value="Submit"/>
        </form>*/
        <div><br/>
        <Form noValidate validated={validated} onSubmit={addEvent}>

                <Form.Group md="4" controlId="validationEvent">
                    <Form.Label>Tapahtuman nimi</Form.Label>
                    <Form.Control
                        onChange={handleEventChange}
                        required
                        type="text"
                        placeholder="nimi"
                    />
                    <Form.Control.Feedback type="invalid">Lisää tapahtuman nimi</Form.Control.Feedback>
                </Form.Group>
                <br/>

                <Form.Group md="4" controlId="validationDate">
                    <Form.Label>Aika</Form.Label>
                    <Form.Control
                        onChange={handleEventChangeDate}
                        required
                        type="text"
                        placeholder="aika"
                    />
                    <Form.Control.Feedback type="invalid">Lisää tapahtuman aika</Form.Control.Feedback>
                </Form.Group>
                <br/>

            <Form.Group md="4" controlId="validationPlace">
                <Form.Label>Paikka</Form.Label>
                <Form.Control
                    onChange={handleEventChangePlace}
                    required
                    type="text"
                    placeholder="paikka"
                />
                <Form.Control.Feedback type="invalid">Lisää tapahtuman paikka</Form.Control.Feedback>
            </Form.Group>
            <br/>

            <Button type="submit">Lisää tapahtuma</Button>
            <br/>
        </Form>
        </div>
    );
}

export default Add