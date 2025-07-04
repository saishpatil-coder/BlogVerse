import React from 'react'

function Logo({width="100px"}) {
  return (
    <div
    style={{height: width, width: width}}
    className=" rounded-full overflow-hidden">
      <img src="/fav.png" alt="logo" className="w-full h-full object-cover" />
    </div>
  )
}

export default Logo
