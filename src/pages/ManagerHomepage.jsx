import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import deleteIcon from "../assets/delete-icon.png";
import "./ManagerHomepage.scss";

const ManagerHomepage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const tasksCollection = collection(db, "Employee-details");
            
            const tasksQuery = query(tasksCollection, where("Role", "==", "Employee"));
            const tasksSnapshot = await getDocs(tasksQuery);
            const tasksData = tasksSnapshot.docs.map((doc) => ({
                id: doc.id, 
                ...doc.data(),
            }));
            setEmployees(tasksData);
            setFilteredEmployees(tasksData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to fetch tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (employeeId) => {
        try {
            await deleteDoc(doc(db, "Employee-details", employeeId));
            fetchTasks();
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter((employee) =>
                employee.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
    }, [searchQuery, employees]);

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
        <div>
            <div className="container">
                <div className="hero-section">
                    <h1>Welcome to Advent Global Solutions INC</h1>
                    <p>
                        At Advent Global, we believe that digital assurance is
                        the foundation of this transformation.
                    </p>
                </div>

                <div className="manager-homepage">
                    <div className="employee-tasks">
                        <h3>Employee Details</h3>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search by employee Name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>
                                            <Link
                                                to={`/employee-details/${employee.id}/employeeId/${employee.Employee_id}`}
                                                className="email-link"
                                            >
                                                {employee.Employee_id}
                                            </Link>
                                        </td>
                                        <td>{employee.name}</td>
                                        <td
                                            className={
                                                employee.status === "Active"
                                                    ? "active-status"
                                                    : "inactive-status"
                                            }
                                        >
                                            {employee.status}
                                        </td>
                                        <td>
                                            <Link to={`/edit-employee/${employee.id}`}>
                                                <button className="edit-button">Edit</button>
                                            </Link>
                                            {employee.status === "Inactive" && (
                                                <>
                                                    <span> / </span>
                                                    <img
                                                        src={deleteIcon}
                                                        alt="Delete"
                                                        className="delete-icon"
                                                        onClick={() => handleDelete(employee.id)}
                                                    />
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No employees found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerHomepage;
