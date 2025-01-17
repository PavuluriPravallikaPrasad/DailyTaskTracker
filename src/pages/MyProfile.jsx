// import React, { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "../config/firebase";
// import "./Myprofile.scss";

// const MyProfile = () => {
//     const [profileData, setProfileData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchProfileData = async () => {
//             setLoading(true);
//             setError("");

//             try {
//                 const auth = getAuth();
//                 const currentUser = auth.currentUser;

//                 if (!currentUser) {
//                     setError("User is not logged in.");
//                     setLoading(false);
//                     return;
//                 }

//                 // Query Employee-details where Email_id matches the current user's email
//                 const employeeDetailsRef = collection(db, "Employee-details");
//                 const q = query(
//                     employeeDetailsRef,
//                     where("Email_id", "==", currentUser.email)
//                 );
//                 const querySnapshot = await getDocs(q);

//                 if (!querySnapshot.empty) {
//                     const employeeData = querySnapshot.docs[0].data();
//                     setProfileData(employeeData);
//                 } else {
//                     setError("User profile not found.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user profile:", error);
//                 setError("Failed to fetch user profile. Please try again.");
//             }

//             setLoading(false);
//         };

//         fetchProfileData();
//     }, []);

//     if (loading) {
//         return <p>Loading profile...</p>;
//     }

//     if (error) {
//         return <p style={{ color: "red" }}>{error}</p>;
//     }

//     if (!profileData) {
//         return null;
//     }

//     return (
//         <div className="profile-container">
//             <h2>My Profile</h2>
//             <div className="profile-details">
//                 <p>
//                     <strong>Full Name:</strong> {profileData.name}
//                 </p>
//                 <p>
//                     <strong>Email:</strong> {profileData.Email_id}
//                 </p>
//                 <p>
//                     <strong>Mobile Number:</strong> {profileData.Phone_Number}
//                 </p>
//                 <p>
//                     <strong>Role:</strong> {profileData.Role}
//                 </p>
//                 <p>
//                     <strong>Registered At:</strong>{" "}
//                     {new Date(profileData.createdAt).toLocaleString()}
//                 </p>
//                 <p>
//                     <strong>Status:</strong> {profileData.status}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default MyProfile;

import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Myprofile.scss";

const MyProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError("");

            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    setError("User is not logged in.");
                    setLoading(false);
                    return;
                }

                // Query Employee-details where Email_id matches the current user's email
                const employeeDetailsRef = collection(db, "Employee-details");
                const q = query(
                    employeeDetailsRef,
                    where("Email_id", "==", currentUser.email)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const employeeData = querySnapshot.docs[0].data();
                    setProfileData(employeeData);
                } else {
                    setError("User profile not found.");
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                setError("Failed to fetch user profile. Please try again.");
            }

            setLoading(false);
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!profileData) {
        return null;
    }

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-details">
                <p>
                    <strong>Full Name:</strong> {profileData.name}
                </p>
                <p>
                    <strong>Email:</strong> {profileData.Email_id}
                </p>
                <p>
                    <strong>Mobile Number:</strong> {profileData.Phone_Number}
                </p>
                <p>
                    <strong>Role:</strong> {profileData.Role}
                </p>
                <p>
                    <strong>Registered At:</strong>{" "}
                    {new Date(profileData.createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Status:</strong> {profileData.status}
                </p>
            </div>
            {/* Back Button */}
            <button onClick={() => navigate("/")}>Back to Homepage</button>
        </div>
    );
};

export default MyProfile;



