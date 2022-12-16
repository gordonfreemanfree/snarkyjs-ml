import React, { useRef, useState } from 'react'
// // import { canvas } from 'canvas'
// //import { getImgFromArr } from 'array-to-image';
// export default function DrawFreeform() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [isDrawing, setIsDrawing] = useState(false)
//   const [points, setPoints] = useState<[number, number][]>([])
//   const [savedImageData, setSavedImageData] = useState<number[][] | null>(null)

//   React.useEffect(() => {
//     const canvas = canvasRef.current
//     const context = canvas.getContext('2d')

//     context.clearRect(0, 0, canvas.width, canvas.height)

//     if (points.length === 0) {
//       return
//     }

//     context.beginPath()
//     context.moveTo(points[0][0], points[0][1])

//     for (const point of points.slice(1)) {
//       context.lineTo(point[0], point[1])
//     }

//     context.stroke()

//     context.lineWidth = 8
//   }, [points])

//   function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
//     const canvas = canvasRef.current
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     setIsDrawing(true)
//     setPoints([...points, [x, y]])
//   }

//   function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
//     if (!isDrawing) {
//       return
//     }

//     const canvas = canvasRef.current
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     setPoints([...points, [x, y]])
//   }

//   function handleMouseUp() {
//     setIsDrawing(false)
//   }

//   function handleSave() {
//     const canvas = canvasRef.current
//     const dataUrl = canvas.toDataURL()
//     const image = new Image()
//     image.src = dataUrl
//     // convert image from base64 to an array of greyscale values

//     image.onload = () => {
//       const scaledCanvas = document.createElement('canvas')
//       scaledCanvas.width = 8
//       scaledCanvas.height = 8
//       const context = scaledCanvas.getContext('2d')
//       context.drawImage(image, 0, 0, 8, 8)

//       const scaledImageData = context.getImageData(0, 0, 8, 8)

//       var normalArray = Array.from(scaledImageData.data)
//       // console.log(normalArray)

//       // convert one dimension array to greyscale
//       const savedImageData2 = []
//       for (let i = 0; i < normalArray.length; i += 4) {
//         // console.log(i)
//         const r = normalArray[i]
//         const g = normalArray[i + 1]
//         const b = normalArray[i + 2]
//         const z = normalArray[i + 3]
//         const v = (r + g + b + z) / 100000
//         savedImageData2.push(v)
//       }
//       // THIS IS THE ARRAY
//       console.log(savedImageData2)

//       setSavedImageData(savedImageData)
//       //console.log(savedImageData)
//     }
//   }

//   function handleReset() {
//     setPoints([])
//     setSavedImageData(null)
//   }

//   return (
//     <div style={{ border: '3px solid black', width: '150px', height: '150px' }}>
//       <canvas
//         ref={canvasRef}
//         width={130}
//         height={130}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//       />
//       <br />
//       <button onClick={handleSave}>Save</button>
//       <button onClick={handleReset}>Reset</button>
//     </div>
//   )
// }
