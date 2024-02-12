import React, { CSSProperties } from 'react'
import { arrayBufferToImageUrl } from '../../Utils/ImageConversion'

interface ArrayBufferAsImageProps {
  arrayBuffer: ArrayBuffer
  className?: string
  style?: CSSProperties
}

const ArrayBufferAsImage: React.FC<ArrayBufferAsImageProps> = ({ arrayBuffer, className, style }) => {
  return <img src={arrayBufferToImageUrl(arrayBuffer)} className={className} style={style} alt="Image" />
}

export default ArrayBufferAsImage
