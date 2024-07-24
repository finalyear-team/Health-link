// hooks/useSocket.ts
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (userId: string | undefined) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;

        // Create a new socket connection with user ID as a query parameter
        const socketInstance = io('http://localhost:4000', {
            query: { userId },
        });

        // Set the socket instance
        setSocket(socketInstance);

        // Clean up on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, [userId]);

    return socket;
};

export default useSocket;
