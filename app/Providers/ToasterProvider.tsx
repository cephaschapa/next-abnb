'use client';

import { FC } from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider:FC = () => {
    return (
        <>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
        </>
    )
}

export default ToasterProvider;