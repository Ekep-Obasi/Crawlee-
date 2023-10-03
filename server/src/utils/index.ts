export function decodeBase64Image(base64Img: string) {
  const image = new Image();
  image.src = base64Img;
  return image;
}
