import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import InputForm from "./pages/InputForm";
import { useState, useEffect } from "react";
// URL to fetch the employees data from the server
const employees_url = "/paganini/api/job-interview/employees";
// App component that renders the Navigation component and the Home or InputForm page
export default function App() {
  // State to hold the employees data
  const [ employees, setEmployees ] = useState(null);
  // Fetch the employees data from the server
  useEffect(() => {
    fetch(employees_url, { method: "GET", headers: { "Content-Type": "application/json" } })
      .then(response => {
        if (response.ok) {
          // If the response is successful, return the JSON object
          return response.json();
        }
        // If the response is unsuccessful, log the response status and return null
        console.log("Server returned response code: " + response.status);
        return null;
      }).then(json => {
        // If the JSON object is not null, check if the success property is true
        if (json.success) {
          setEmployees(json.data);
        } else {
          console.log("Server returned unsuccessful response.");
        }
        // If the JSON object is null, log an error
      }).catch(error => {
        console.log("Error occurred: " + error);
      });
  }, [setEmployees]);

  // Function to add a new employee to the employees array
  function addEmployee(newName, newLastName, dateOfBirth, newOccupation) {
    // Create a new employee object
    var newEmployee = {
      id : employees.length + 1,
      firstName : newName,
      lastName : newLastName,
      dateOfBirth : dateOfBirth,
      jobTitle : newOccupation
    };
    // Update the employees state with the new employee
    setEmployees([...employees, newEmployee]);
  }

  setInterval(() => {
    
  }, 10);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home employees={employees} />} />
          <Route path="form" element={<InputForm addEmployee={addEmployee} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}