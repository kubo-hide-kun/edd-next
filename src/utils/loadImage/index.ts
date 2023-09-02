export const loadImage = (src: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();

    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};
