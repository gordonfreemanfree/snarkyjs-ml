import React, { useRef, useState } from 'react'

export default function ImageProcessor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [savedImageData, setSavedImageData] = useState<number[][] | null>(null)

  React.useEffect(() => {
    if (!imageData) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    // Scale down the image
    const scaledImageData = context.createImageData(10, 10)

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const i = y * 10 + x
        const j = (y * 100 + x) * 4
        scaledImageData.data[i * 4] = imageData.data[j]
        scaledImageData.data[i * 4 + 1] = imageData.data[j + 1]
        scaledImageData.data[i * 4 + 2] = imageData.data[j + 2]
        scaledImageData.data[i * 4 + 3] = imageData.data[j + 3]
      }
    }

    // Convert to grayscale
    for (let i = 0; i < scaledImageData.data.length; i += 4) {
      const r = scaledImageData.data[i]
      const g = scaledImageData.data[i + 1]
      const b = scaledImageData.data[i + 2]
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b
      scaledImageData.data[i] = v
      scaledImageData.data[i + 1] = v
      scaledImageData.data[i + 2] = v
    }

    context.putImageData(scaledImageData, 0, 0)
  }, [imageData])

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const image = new Image()
      image.addEventListener('load', () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0)

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        )
        setImageData(imageData)
      })
      image.src = reader.result as string
    })
    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (!imageData) {
      return
    }

    const scaledImageData = new Array(10)
    for (let y = 0; y < 10; y++) {
      scaledImageData[y] = new Array(10)
      for (let x = 0; x < 10; x++) {
        const i = y * 10 + x
        scaledImageData[y][x] = imageData.data[i * 4]
      }
    }

    setSavedImageData(scaledImageData)
    console.log(scaledImageData)
  }

  return (
    <>
      <canvas ref={canvasRef} width={10} height={10} />
      <input type="file" onChange={handleImage} />
      <button onClick={handleSave}>Save</button>
    </>
  )
}
