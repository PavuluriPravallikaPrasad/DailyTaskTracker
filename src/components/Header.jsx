import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import "../global.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    // Query the "Employee-details" collection for the document with matching Email_id
                    const employeeDetailsCollection = collection(
                        db,
                        "Employee-details"
                    );
                    const q = query(
                        employeeDetailsCollection,
                        where("Email_id", "==", currentUser.email)
                    );
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setUserName(userData.name);
                    } else {
                        console.error(
                            "User document not found in Employee-details."
                        );
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate("/about");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <div className="navbar">
            <div className="logo">
                <a href="/">
                    <img
                        src="https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/256x256/49f24c94b49d5a415a07384302297cb1"
                        alt="home_pic"
                    />
                </a>
            </div>
            <div className="nav-links">
                <a href="/about">About</a>
                {user ? (
                    <>
                        <p>Welcome, {userName}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <a href="/login">
                        <button>Login</button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Header;
