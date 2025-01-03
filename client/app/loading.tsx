import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className="p-6 flex flex-col justify-center items-center gap-20 align-middle max-h-screen h-screen">
            <Image
                src="/image/brand/logo-icon.svg"
                alt="logo"
                width={500}
                height={500}
                priority={true}
                className="auto"
            />
            <div>
                Health-link
            </div>

        </div>
    )
}

export default Loading