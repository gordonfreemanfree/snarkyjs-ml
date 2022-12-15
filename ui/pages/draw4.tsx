import React, { useRef, useState } from 'react'

export default function DrawFreeform() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<[number, number][]>([])
  const [savedImageData, setSavedImageData] = useState<number[][] | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)

    if (points.length === 0) {
      return
    }

    context.beginPath()
    context.moveTo(points[0][0], points[0][1])

    for (const point of points.slice(1)) {
      context.lineTo(point[0], point[1])
    }

    context.stroke()
  }, [points])

  function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setIsDrawing(true)
    setPoints([...points, [x, y]])
  }

  function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) {
      return
    }

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setPoints([...points, [x, y]])
  }

  function handleMouseUp() {
    setIsDrawing(false)
  }

  function handleSave() {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL()
    const image = new Image()
    image.src = dataUrl
    image.onload = () => {
      const scaledCanvas = document.createElement('canvas')
      scaledCanvas.width = 10
      scaledCanvas.height = 10
      const context = scaledCanvas.getContext('2d')
      context.drawImage(image, 0, 0, 10, 10)

      const scaledImageData = context.getImageData(0, 0, 10, 10)

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

      //   const savedImageData = new Array(10)
      //   for (let y = 0; y < 10; y++) {
      //     savedImageData[y] = new Array(10)
      //     for (let x = 0; x < 10; x++) {
      //       const i = y * 10 + x
      //       savedImageData[y][x] = scaledImageData.data[i * 4]
      //     }
      //   }
      const savedImageData = new Array(10)
      for (let y = 0; y < 10; y++) {
        savedImageData[y] = new Array(10)
        for (let x = 0; x < 10; x++) {
          const i = y * 10 + x
          savedImageData[y][x] = scaledImageData.data[i * 4]
        }
      }

      setSavedImageData(savedImageData)
      console.log(savedImageData)
    }
  }

  function handleReset() {
    setPoints([])
    setSavedImageData(null)
  }

  return (
    <div style={{ border: '1px solid black', width: '500px', height: '500px' }}>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
