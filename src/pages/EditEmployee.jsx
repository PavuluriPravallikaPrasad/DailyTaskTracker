
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditEmployee = () => {
    const { id } = useParams();  
    const navigate = useNavigate();  
    const [employee, setEmployee] = useState({
        name: "",
        status: "",
    });
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeDoc = doc(db, "Employee-details", id);
                const docSnap = await getDoc(employeeDoc);
                if (docSnap.exists()) {
                    setEmployee(docSnap.data());
                } else {
                    alert("Employee not found.");
                    navigate("/managerhomepage");
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
                alert("Error fetching employee data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeRef = doc(db, "Employee-details", id);
            await updateDoc(employeeRef, employee);  
            alert("Employee details updated successfully!");
            navigate(`/managerhomepage`); 
        } catch (error) {
            console.error("Error updating employee data:", error);
            alert("Failed to update employee details.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="edit-employee">
            <h2>Edit Employee Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee Name</label>
                    <input
                        type="text"
                        name="name"
                        value={employee.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select
                        name="status"
                        value={employee.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditEmployee;
