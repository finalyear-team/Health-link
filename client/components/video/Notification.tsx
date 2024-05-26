import React from 'react';

const Notification = ({ message }:any) => {
    return (
        <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2">
            {message}
        </div>
    );
};

export default Notification;
