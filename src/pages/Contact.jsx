import React from "react";
import "../global.scss";
import "./Contact.scss";

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="contact-left">
                <h1>Let’s get in touch</h1>
                <p>+1-281-970-3000</p>
                <p>adventglobal.com</p>
                <address>
                    Advent Global Solutions Inc.
                    <br />
                    12777 Jones Road, Suite 445
                    <br />
                    Houston, TX 77070
                </address>
            </div>

            <div className="contact-right">
                <form>
                    <div className="form-group">
                        <label>Name *</label>
                        <div className="name-inputs">
                            <input type="text" placeholder="First" />
                            <input type="text" placeholder="Last" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input type="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Comment or Message *</label>
                        <textarea placeholder="Your message"></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
