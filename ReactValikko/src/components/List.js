import React, {useEffect, useState} from "react";
import { Table } from 'react-bootstrap'
import axios from 'axios';

const List = () => {

    const [contents, setEvents] = useState([0])
    useEffect(() =>{
        axios
            .get('http://localhost:3001/events')
            .then(response => {
                console.log('works')
                setEvents(response.data)
            })
    },[])
    return(
        <div className="container">
            {/* A JSX comment */}
            <Table striped>
            <tbody>
            {contents.map(content => (
                <tr key={content.id}>
                    <td>
                        <p>{content.name}</p>
                        <p>{content.date}</p>
                        <p>{content.place}</p>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        </div>
    )
}
export default List