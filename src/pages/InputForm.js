import React from 'react';
// InputForm component that displays a form to add a new employee
export default function InputForm({addEmployee}) {
    // State to hold the form data
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("");
    const [occupation, setOccupation] = React.useState("");
    // Function to handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Leave it in the console for the task
        console.log(name, lastName, dateOfBirth, occupation);
        // Add it to show functionality
        addEmployee(name, lastName, dateOfBirth, occupation);
    }
    return(
        <div className='centerPad'>
            <h1>Dodaj Zaposlenika</h1>
            <form>
                <label htmlFor="firstName">Ime:</label>
                <input type="text" id="firstName" name="firstName" required onChange={(event) => setName(event.target.value)} />
                <label htmlFor="lastName">Prezime:</label>
                <input type="text" id="lastName" name="lastName" required onChange={(event) => setLastName(event.target.value)} />
                <label htmlFor='dateOfBirth'>Datum Rođenja:</label>
                <input type='date' id='dateOfBirth' name='dateOfBirth' required onChange={(event) => setDateOfBirth(event.target.value)} />
                <label htmlFor="jobTitle">Pozicija:</label>
                <input type="text" id="jobTitle" name="jobTitle" required onChange={(event) => setOccupation(event.target.value)} />
                <button onClick={handleSubmit} type="submit">Spremi</button>
            </form>
        </div>
    )
}