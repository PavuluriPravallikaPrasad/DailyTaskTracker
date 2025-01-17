

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./EmployeeHomepage.scss";
// import { db, storage } from "../config/firebase";
// import {
//     collection,
//     addDoc,
//     serverTimestamp,
//     getDoc,
//     doc,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const EmployeeHomepage = () => {
//     const [taskDetails, setTaskDetails] = useState("");
//     const [status, setStatus] = useState("Select Status");
//     const [dueDate, setDueDate] = useState(null);
//     const [project, setProject] = useState("Select Project");
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const uploadFile = async (file) => {
//         //const storage = getStorage();
//         const fileRef = ref(storage, `task_attachments/${file.name}`);
//         try {
//             const snapshot = await uploadBytes(fileRef, file);
//             const downloadURL = await getDownloadURL(snapshot.ref);
//             return downloadURL;
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             alert("File upload failed. Please try again.");
//             return null;
            
//         }
        
//     };

//     const handleAddTask = async (e) => {
//         e.preventDefault();
    
//         // Check if the user is authenticated
//         const auth = getAuth();
//         const currentUser = auth.currentUser;
    
//         if (!currentUser) {
//             alert("User is not logged in.");
//             return;  // Stop further execution if the user is not authenticated
//         }
    
//         // Proceed with task creation logic
//         if (!taskDetails.trim()) {
//             alert("Task details cannot be empty");
//             return;
//         }
    
//         if (status === "Select Status") {
//             alert("Please select a valid status");
//             return;
//         }
    
//         if (!dueDate) {
//             alert("Please select a due date");
//             return;
//         }
    
//         setLoading(true);
//         try {
//             const userRef = doc(db, "Employee-details", currentUser.uid);
//             const userDoc = await getDoc(userRef);
    
//             if (!userDoc.exists()) {
//                 alert("User information not found.");
//                 setLoading(false);
//                 return;
//             }
    
//             const userData = userDoc.data();
//             const employeeId = userData.Employee_id;
//             const taskId = Math.floor(1000 + Math.random() * 9000).toString();
    
//             let fileUrl = null;
//             if (file) {
//                 fileUrl = await uploadFile(file);
//                 if (!fileUrl) return; // Stop execution if file upload fails
//             }
    
//             await addDoc(collection(db, "Task_details"), {
//                 taskDetails: taskDetails.trim(),
//                 status: status,
//                 project: project,
//                 dueDate: dueDate.toISOString(),
//                 createdAt: serverTimestamp(),
//                 createdBy: currentUser.email,
//                 employee_id: employeeId,
//                 task_id: taskId,
//                 attachmentUrl: fileUrl, // Store file URL in Firestore
//             });
    
//             setTaskDetails("");
//             setStatus("Select Status");
//             setProject("Select Project");
//             setDueDate(null);
//             setFile(null); // Reset file input
    
//             alert("Task added successfully!");
//         } catch (error) {
//             console.error("Error adding task:", error);
//             alert("Failed to add task. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <div className="employee-homepage">
//             <h2>Adding a Task</h2>
//             <form onSubmit={handleAddTask}>
//                 <div className="form-group">
//                     <label htmlFor="taskDetails">Task Details:</label>
//                     <textarea
//                         id="taskDetails"
//                         value={taskDetails}
//                         onChange={(e) => setTaskDetails(e.target.value)}
//                         rows="6"
//                         placeholder="Describe your task progress, challenges, and next steps..."
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="status">Status:</label>
//                     <select
//                         id="status"
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                         required
//                     >
//                         <option value="Select Status" disabled>
//                             Select Status
//                         </option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="project">Project:</label>
//                     <select
//                         id="project"
//                         value={project}
//                         onChange={(e) => setProject(e.target.value)}
//                         required
//                     >
//                         <option value="Select Project" disabled>
//                             Select Project
//                         </option>
//                         <option value="SNR">SNR</option>
//                         <option value="Unity">Unity</option>
//                         <option value="Heartbeat">Heartbeat</option>
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="dueDate">Due Date:</label>
//                     <DatePicker
//                         id="dueDate"
//                         selected={dueDate}
//                         onChange={(date) => setDueDate(date)}
//                         dateFormat="MMMM d, yyyy"
//                         placeholderText="Select a due date"
//                         todayButton="Today"
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label htmlFor="attachment">Attachment (Optional):</label>
//                     <input
//                         type="file"
//                         id="attachment"
//                         onChange={(e) => setFile(e.target.files[0])}
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="submit-button"
//                     disabled={loading}
//                 >
//                     {loading ? "Saving..." : "Add Task"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EmployeeHomepage;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EmployeeHomepage.scss";
import { db, storage } from "../config/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDoc,
    doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EmployeeHomepage = () => {
    const [taskDetails, setTaskDetails] = useState("");
    const [status, setStatus] = useState("Select Status");
    const [dueDate, setDueDate] = useState(null);
    const [project, setProject] = useState("Select Project");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadFile = async (file) => {
        const fileRef = ref(storage, `task_attachments/${file.name}`);
        try {
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed. Please try again.");
            return null;
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();

        // Check if the user is authenticated
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
            alert("User is not logged in.");
            return;  // Stop further execution if the user is not authenticated
        }

        // Validate form data
        if (!taskDetails.trim()) {
            alert("Task details cannot be empty");
            return;
        }

        if (status === "Select Status") {
            alert("Please select a valid status");
            return;
        }

        if (!dueDate) {
            alert("Please select a due date");
            return;
        }

        setLoading(true);
        try {
            const userRef = doc(db, "Employee-details", currentUser.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                alert("User information not found.");
                setLoading(false);
                return;
            }

            const userData = userDoc.data();
            const employeeId = userData.Employee_id;
            const taskId = Math.floor(1000 + Math.random() * 9000).toString();

            let fileUrl = null;
            if (file) {
                fileUrl = await uploadFile(file);
                if (!fileUrl) return; // Stop if file upload fails
            }

            // Add task details to Firestore
            await addDoc(collection(db, "Task_details"), {
                taskDetails: taskDetails.trim(),
                status: status,
                project: project,
                dueDate: dueDate.toISOString(),
                createdAt: serverTimestamp(),
                createdBy: currentUser.email,
                employee_id: employeeId,
                task_id: taskId,
                attachmentUrl: fileUrl, // Store file URL in Firestore
            });

            // Reset form fields after successful submission
            setTaskDetails("");
            setStatus("Select Status");
            setProject("Select Project");
            setDueDate(null);
            setFile(null); // Reset file input

            // Show success alert and refresh the page after the user clicks OK
            alert("Task added successfully!");
            window.location.reload();  // Force page reload after alert is closed
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Failed to add task. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="employee-homepage">
            <h2>Adding a Task</h2>
            <form onSubmit={handleAddTask}>
                <div className="form-group">
                    <label htmlFor="taskDetails">Task Details:</label>
                    <textarea
                        id="taskDetails"
                        value={taskDetails}
                        onChange={(e) => setTaskDetails(e.target.value)}
                        rows="6"
                        placeholder="Describe your task progress, challenges, and next steps..."
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Select Status" disabled>
                            Select Status
                        </option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="project">Project:</label>
                    <select
                        id="project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        required
                    >
                        <option value="Select Project" disabled>
                            Select Project
                        </option>
                        <option value="SNR">SNR</option>
                        <option value="Unity">Unity</option>
                        <option value="Heartbeat">Heartbeat</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date:</label>
                    <DatePicker
                        id="dueDate"
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a due date"
                        todayButton="Today"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="attachment">Attachment (Optional):</label>
                    <input
                        type="file"
                        id="attachment"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Add Task"}
                </button>
            </form>
        </div>
    );
};

export default EmployeeHomepage;
