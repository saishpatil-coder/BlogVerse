import React, { forwardRef ,useId} from 'react'

function Select({
    options = [],
    label,
    className = "",
    ...props
},ref) {
    const id = useId();
  return (
    <div className={`w-full ${className}`}>
      {label && <label htmlFor={id} className='inline-block mb-1 pl-1'></label>}
        <select 
        {...props}
        ref={ref}
         className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} name="" id="">
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
         </select>
    </div>
  )
}

export default forwardRef( Select)
