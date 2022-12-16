import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Field } from 'snarkyjs'
import Image from 'next/image'

export function Demo(props: any) {
  // const [selectedImage, setSelectedImage] = useState<Array<Field>>(Array<Field>)

  const imageArray_0: Array<number> = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    3,
    3,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    0,
    0,
    0,
    0,
  ]
  const imageArray_1: Array<number> = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    2,
    1,
    0,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]
  const imageArray_2: Array<number> = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]
  const imageArray_3: Array<number> = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    4,
    4,
    2,
    0,
    0,
    0,
    0,
    4,
    2,
    0,
    3,
    0,
    0,
    0,
    0,
    4,
    0,
    0,
    3,
    0,
    0,
    0,
    0,
    4,
    2,
    4,
    4,
    0,
    0,
    0,
    0,
    1,
    4,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]

  function preprocessImage(image: number[]): Array<Field> {
    const imagePreprocessed = num2Field_t1(image)
    console.log('imagePreprocessed', imagePreprocessed.toString())
    return imagePreprocessed
  }

  // Description:   Convert a Rank 1 Tensor of numbers to Rank 1 Tensor of Fields
  // Input:         x - Rank 1 Tensor of type number
  // Output:        y - Rank 1 Tensor of type Field
  function num2Field_t1(x: Array<number>): Array<Field> {
    let y = Array()
    x.forEach((value, index) => (y[index] = num2Field(value)))
    return y
  }

  // Description:   Convert number to a Field by multiplying it by the
  // scale factor and taking the floor
  // Input:         x - number
  // Output:        y - Field
  function num2Field(x: number): Field {
    return Field(x)
    // commenting this scale factor out for now
    // return Field.from(Math.floor(x * this.scale_factor));
  }

  const handleClick = (image: Array<number>) => {
    props.setSelectedImage(preprocessImage(image))
  }

  return (
    <div className={styles.card3}>
      <h1 className={styles.title}>Neural Nets in SnarkyJS</h1>
      <p className={styles.description}>
        This is a demo of a neural network that is run on the client side. It
        takes an image as an input and predicts the number in the image. Select
        one of the images below to see the prediction.
      </p>
      <div className={styles.grid}>
        <div className={styles.card} onClick={() => handleClick(imageArray_0)}>
          <Image
            src="/image_0_label_7_original.png"
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 7</p>
        </div>
        <div className={styles.card} onClick={() => handleClick(imageArray_1)}>
          <Image
            src="/image_1_label_2_original.png"
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 2</p>
        </div>
        <div className={styles.card} onClick={() => handleClick(imageArray_2)}>
          <Image
            src="/image_2_label_1_orginal.png"
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 1</p>
        </div>
        <div className={styles.card} onClick={() => handleClick(imageArray_3)}>
          <Image
            src="/image_3_label_0_orginal.png"
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 0</p>
        </div>
      </div>
      <button
        className={styles.button}
        onClick={() => console.log(props.selectedImage)}
      >
        Predict the number and update the state by sending a transaction
      </button>
    </div>
  )
}
