import { forwardRef, useId } from 'react';

const Input = forwardRef(function Input({ label, type = "text", className="", ...props }, ref)
{
    let inputId = useId();
    return(
        <div className='w-full'>
            {label && <label htmlFor={inputId} className='inline-block mb-1 pl-1'>{label}</label>}
            <input
                type={type}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
                id={inputId}
            />
        </div>
    )
}
)

export default Input
