import React from "react";
import { useLocation } from "react-router-dom";

const About = () => {
    const location = useLocation();
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-orange-500">About Page</h1>
             <p>Current path: <span className="font-medium text-gray-700">{location.pathname}</span></p>
        </div>
    );
};

export default About;
