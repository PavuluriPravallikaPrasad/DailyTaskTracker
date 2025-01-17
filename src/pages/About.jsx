import React from "react";
import "../global.scss";

const About = () => {
    return (
        <div className="about-container">
            <section className="welcome-section">
                <h1>Welcome to</h1>
                <h2>Advent Global Solutions!</h2>
                <p>
                    Since 1997, Advent Global Solutions has been at the
                    forefront of technology, seamlessly blending deep expertise
                    in systems and solutions with a passionate team of over
                    1,500 professionals. With a mission to drive digital
                    transformation for companies around the globe, we are
                    dedicated to shaping the future with our innovative approach
                    encapsulated in our core values of TECH: Think, Emerge,
                    Connect, and Hustle.
                </p>
            </section>

            <section className="legacy-section">
                <h2>Our Legacy</h2>
                <p>
                    With a three-decade legacy and experience serving over 100
                    Fortune companies, our evolution into AdventEdge3.0
                    signifies a new chapter in our journey. This new avatar
                    reflects our enduring commitment to developing, customizing,
                    and integrating complex enterprise-level solutions. Our
                    focus is on harnessing the power of digital transformation
                    to accelerate and enhance your business processes.
                </p>
            </section>

            <section className="expertise-section">
                <h2>Our Expertise</h2>
                <p>
                    At Advent Global, we understand the pressing need for rapid
                    transformation and seamless customer experiences in today’s
                    business landscape. Having successfully completed over 1,000
                    projects for more than 500 clients, we have built a "center
                    of excellence" in several key areas:
                </p>
                <ul>
                    <li>
                        <strong>Digital Staffing:</strong> Exceptional talent
                        acquisition to fuel your innovation.
                    </li>
                    <li>
                        <strong>Quality Assurance:</strong> Ensuring high
                        industry standards through rigorous testing.
                    </li>
                    <li>
                        <strong>Enterprise Mobility:</strong> Seamless
                        integration of workflows for operational efficiency.
                    </li>
                    <li>
                        <strong>SAP:</strong> Delivering operational excellence
                        and driving innovation.
                    </li>
                </ul>
            </section>

            <section className="approach-section">
                <h2>Our Approach</h2>
                <p>
                    Successful businesses today embrace a digital-first
                    approach. At Advent Global, we believe that digital
                    assurance is the foundation of this transformation. Our
                    commitment to AI-led assurance and innovation ensures
                    accelerated solutions readiness, helping you lead the
                    market, grow your business, and achieve transformative
                    success.
                </p>
                <p>
                    We build modern, robust, intuitive, and secure solutions
                    that scale with your evolving needs, driving digital
                    excellence and ensuring that your digital potential is fully
                    realized.
                </p>
            </section>

            {/* <section className="cta-section">
                <h2>Talk to one of our Experts for a Customized Solution</h2>
                <button>
                    <a href="/contact">Click Here</a>
                </button>
            </section> */}
        </div>
    );
};

export default About;
