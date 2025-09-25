import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ className = '', showTextOnMobile = true }) => {
    return (
        <Link to="/" className={`flex items-center ${className}`}>
            <div className="flex items-center">
                <svg
                    className="w-8 h-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="AI Planner Logo"
                >
                    <path
                        d="M16 4L6 9L16 14L26 9L16 4Z"
                        fill="currentColor"
                        fillOpacity="0.9"
                    />
                    <path
                        d="M6 14L16 19L26 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillOpacity="0.7"
                    />
                    <path
                        d="M6 19L16 24L26 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fillOpacity="0.5"
                    />
                    <circle
                        cx="16"
                        cy="14"
                        r="2"
                        fill="currentColor"
                    />
                    <path
                        d="M18 14C18 14 19 13 19 11.5C19 10 18 9 18 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
                {showTextOnMobile ? (
                    <span className="ml-2 text-2xl font-bold">
                        AI Planner
                    </span>
                ) : (
                    <span className="ml-2 text-2xl font-bold hidden md:block">
                        AI Planner
                    </span>
                )}
            </div>
        </Link>
    );
};

export default Logo;