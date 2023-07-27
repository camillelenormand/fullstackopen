import React from 'react'

const Image = ({ src, alt, width, height }) => {
  return(
    <div>
      <img src={src} alt={alt} width={width} height={height}/>
    </div>
  )
}

export default Image