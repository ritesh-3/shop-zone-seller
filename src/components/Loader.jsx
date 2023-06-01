import React, { useEffect, useState } from 'react';

const Loader = () => {
    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevCount) => (prevCount % 5) + 1);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const dots = '.'.repeat(dotCount);

    return (
        <div className='App'>
            <h2 className='text-3xl text-white'>Loading{dots}</h2>
        </div>
    );
};

export default Loader;
