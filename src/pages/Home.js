import { React, useState } from 'react';
// Home page that displays a list of employees in a table
export default function Home({employees}) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState(1);
    // Convert date to a more readable format
    function formatDate(dateUnformatted) {
        // Convert to Date object
        const date = new Date(dateUnformatted);
        // Get the day, month and year
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        // Return the formatted date
        return `${day}/${month}/${year}`;
    }
    function sortFor(sort) {
        // If the selected property is the same as the current sortBy property, change the sortOrder
        if (sortBy === sort) {
            setSortOrder(sortOrder === 1 ? -1 : 1);
        } else {
            // If the selected property is different from the current sortBy property, set the sortBy property to the selected property and the sortOrder property to "asc"
            setSortBy(sort);
            setSortOrder(1);
        }

        console.log(sortBy, sort, sortOrder);
    }
    // Filter employees based on the search input
    function filterEmployees() {
        // If employees is not yet loaded, return an empty array
        if (!employees) return [];
        // Return the filtered employees based on the search input and sort by the selected property
        return employees.filter(employee => {
            // Check if the search input is included in the employee's first name or last name
            return employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
                employee.lastName.toLowerCase().includes(search.toLowerCase());
        }).sort((a, b) => {
            // Sort the employees based on the selected property
            if (a[sortBy] < b[sortBy]) {
                return -sortOrder;
            }
            if (a[sortBy] > b[sortBy]) {
                return sortOrder;
            }
            return 0;
        });
    }
    // If employees is not yet loaded, display "Loading..."
    if (!employees) return <h1>Loading...</h1>;
    return(
        <div className='centerPad'>
            <h1>Zaposlenici</h1>
            <label htmlFor="search">Pretraži:</label>
            <input type="text" id="search" name="search" onChange={(event) => setSearch(event.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortFor("firstName")}>Ime</th>
                        <th onClick={() => sortFor("lastName")}>Prezime</th>
                        <th onClick={() => sortFor("dateOfBirth")}>Datum Rođenja</th>
                        <th onClick={() => sortFor("jobTitle")}>Pozicija</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Map through the filtered employees and display them in a table
                        filterEmployees().map(employee => {
                            return (
                                <tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{formatDate(employee.dateOfBirth)}</td>
                                    <td>{employee.jobTitle}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}