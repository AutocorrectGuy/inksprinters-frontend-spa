export const arrayBufferToImageUrl = (arrayBuffer:ArrayBuffer) => {
  const imageBlob = new Blob([arrayBuffer], { type: 'image/png' });
  const imageUrl = URL.createObjectURL(imageBlob);
  return imageUrl
}