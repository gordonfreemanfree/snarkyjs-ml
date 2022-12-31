import React, { useRef, useState } from 'react'
import canvas from 'canvas'
import styles from '../styles/Home.module.css'

export default function DrawFreeform(props: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [points, setPoints] = useState<[number, number][]>([])
  //   const [savedImageData, setSavedImageData] = useState<number[] | null>(null)
  //   const [scaledImage, setScaledImage] = useState<number[] | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas!.getContext('2d')

    context!.clearRect(0, 0, canvas!.width, canvas!.height)

    if (points.length === 0) {
      return
    }

    context!.beginPath()
    context!.moveTo(points[0][0], points[0][1])

    for (const point of points.slice(1)) {
      context!.lineTo(point[0], point[1])
    }

    context!.stroke()

    context!.lineWidth = 4
  }, [points])

  function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    const rect = canvas!.getBoundingClientRect()
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
    const rect = canvas!.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setPoints([...points, [x, y]])
  }

  function handleMouseUp() {
    setIsDrawing(false)
  }

  function handleSave() {
    const canvas = canvasRef.current
    const dataUrl = canvas!.toDataURL()
    const image = new Image()
    image.src = dataUrl
    // convert image from base64 to an array of greyscale values

    image.onload = () => {
      const scaledCanvas = document.createElement('canvas')
      scaledCanvas.width = 8
      scaledCanvas.height = 8
      const context = scaledCanvas.getContext('2d')
      context!.drawImage(image, 0, 0, 8, 8)

      const scaledImageData = context!.getImageData(0, 0, 8, 8)

      var normalArray = Array.from(scaledImageData.data)
      // console.log(normalArray)

      // convert one dimension array to greyscale
      const savedImageData2 = []
      for (let i = 0; i < normalArray.length; i += 4) {
        // console.log(i)
        const r = normalArray[i]
        const g = normalArray[i + 1]
        const b = normalArray[i + 2]
        const z = normalArray[i + 3]
        const v = (r + g + b + z) / 100000
        savedImageData2.push(v)
      }
      // THIS IS THE ARRAY
      console.log(savedImageData2)

      props.handleSavedImageData(savedImageData2)
      // setSavedImageData(savedImageData2)

      // scale the every pixel to positive integers
      let scaledPixelArray = savedImageData2.map((pixel) => {
        return Math.round(pixel * 1000)
      })

      //   let scaledPixels = savedImageData2.forEach((pixel) => {
      //     Math.round(pixel * 1000)
      //   })
      props.handleScaledImage(scaledPixelArray)
      // setScaledImage(scaledPixelArray)
      console.log('scaling is', scaledPixelArray)
    }
  }
  //   // function to scale the image pixels to positive integers
  //   function scaleImageData(imageData: number[] | null) {
  //     const scaledImageData = imageData!.map((row) =>
  //       row.map((pixel) => Math.round(pixel * 1000)),
  //     )
  //     setScaledImage(scaledImageData)
  //     console.log('scaling images', scaledImage)
  //   }

  function handleReset() {
    setPoints([])
    props.handleScaledImage(null)
  }

  return (
    <div>
      <h1 style={{ margin: 'auto', textAlign: 'center', padding: '1rem' }}>
        ... or draw your own number from 0 to 9
      </h1>
      <h4 style={{ margin: 'auto', textAlign: 'center' }}>
        make sure that you make a nice drawing. The prediction works best for 0
        and 1.
      </h4>
      <div className={styles.canvas}>
        <div
          style={{
            border: '1px solid black',
            width: '150px',
            height: '150px',
            margin: 'auto',
          }}
        >
          <canvas
            ref={canvasRef}
            width={150}
            height={150}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
          {/* <br /> */}
        </div>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}
      >
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}
