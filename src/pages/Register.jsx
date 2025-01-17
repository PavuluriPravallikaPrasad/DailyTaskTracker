import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./Register.scss";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        role: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateEmployeeId = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { fullName, email, password, confirmPassword, mobile, role } =
            formData;

        if (
            !fullName ||
            !email ||
            !password ||
            !confirmPassword ||
            !mobile ||
            !role
        ) {
            setError("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Generate employee ID
            const employeeId = generateEmployeeId();

            // Save user details in Firestore under Employee-details
            await setDoc(doc(db, "Employee-details", user.uid), {
                Email_id: email,
                Employee_id: `${employeeId}`,
                Phone_Number: mobile,
                Role: role,
                name: fullName,
                createdAt: new Date().toISOString(),
                status: "Active",
            });

            setSuccess("Registration successful!");
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
                mobile: "",
                role: "",
            });

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error registering user:", error);
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Register</h1>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
