import React, { useState } from "react";
import "./Login.scss";
import { auth, db } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            // Fetch user details from Firestore
            const userDocRef = doc(db, "Employee-details", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                if (userData.Role === "Manager") {
                    navigate("/managerhomepage"); // Navigate immediately to Manager Homepage
                } else if (userData.Role === "Employee") {
                    navigate("/"); // Navigate to Employee Homepage
                } else {
                    setError("Role not recognized.");
                }
            } else {
                setError("User details not found.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError("Failed to log in. Please check your credentials.");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Login</h1>
                <form onSubmit={handleSignIn}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {error && <p className="error">{error}</p>}
                <p>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
