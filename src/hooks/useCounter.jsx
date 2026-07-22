import React, { useEffect, useState } from "react";

const useCounter = (seconds) => {
    const [counter, setCounter] = useState(seconds);

    useEffect(() => {
        if (counter === 0) {
            return;
        }
        const interval = setInterval(() => {
            setCounter(counter - 1);
        }, 1000);
        return () => clearTimeout(interval);
    }, [counter]);

    function startCounter(seconds) {
        setCounter(seconds);
    }
    return { counter, startCounter };
};

export default useCounter;
