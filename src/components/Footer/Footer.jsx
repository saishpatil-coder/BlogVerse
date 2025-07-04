import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white py-4 mt-auto shadow-inner flex items-center justify-center">
            <div className="text-center w-full">
                <span className="font-semibold">MegaBlog</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
            </div>
        </footer>
    );
}
