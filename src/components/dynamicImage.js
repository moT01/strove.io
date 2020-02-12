import React from 'react'

const DynamicImage = ({ url, alt }) => {
  const [image, status] = useImage(url)

  return <img src={image} alt={alt} />
}