import React from 'react'
import { createCanvas } from 'canvas'

// export const getGrayscaleValues = (imageData: ImageData): number[][] => {
//   const grayscaleValues: number[][] = []

//   for (let y = 0; y < imageData.height; y++) {
//     const row: number[] = []
//     for (let x = 0; x < imageData.width; x++) {
//       const index = (y * imageData.width + x) * 4
//       const r = imageData.data[index]
//       const g = imageData.data[index + 1]
//       const b = imageData.data[index + 2]
//       // calculate the grayscale value using the luminosity formula
//       const value = 0.2126 * r + 0.7152 * g + 0.0722 * b
//       row.push(value)
//     }
//     grayscaleValues.push(row)
//   }

//   return grayscaleValues
// }

// export const getNumberSize = (image: HTMLImageElement): [number, number] => {
//   // create a canvas element and draw the image on it
//   const canvas = createCanvas(image.width, image.height)
//   const context = canvas.getContext('2d')
//   context.drawImage(image, 0, 0)

//   // get the image data from the canvas
//   const imageData = context.getImageData(0, 0, image.width, image.height)

//   // calculate the size of the number by counting the number of non-white pixels
//   let size = 0
//   for (let i = 0; i < imageData.data.length; i += 4) {
//     const r = imageData.data[i]
//     const g = imageData.data[i + 1]
//     const b = imageData.data[i + 2]
//     if (r !== 255 || g !== 255 || b !== 255) {
//       size++
//     }
//   }

//   return [image.width, image.height]
// }
