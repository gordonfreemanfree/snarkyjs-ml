import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Field } from 'snarkyjs'
import Image from 'next/image'
import image_0_label_7_original from '../public/image_0_label_7_original.png'
import image_1_label_2_original from '../public/image_1_label_2_original.png'
import image_2_label_1_original from '../public/image_2_label_1_original.png'
import image_3_label_0_original from '../public/image_3_label_0_original.png'
import DrawFreeform from './DrawFreeform'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Demo(props: any) {
  const warning = (message: string) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  const notify = (message: string) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
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
    notify('Image selected!')
  }

  return (
    <div className={styles.card3}>
      <h1 className={styles.title}>Neural Nets in SnarkyJS</h1>
      <p className={styles.description}>
        This is a demo of a neural network that is run on the client side. It
        takes an image as an private input and predicts the number in the image.
        Finally the zkapp state will be updatet to the prediction. Try it out
        yourself!
      </p>
      <h1 style={{ margin: 'auto', textAlign: 'center', padding: '2rem' }}>
        <b style={{ color: 'black' }}>1.a</b> You can either select one of the
        images below ...
      </h1>
      <div className={styles.grid}>
        <div
          className={styles.card}
          onClick={() => {
            handleClick(imageArray_0)
          }}
        >
          <Image
            src={image_0_label_7_original}
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 7</p>
        </div>
        <div className={styles.card} onClick={() => handleClick(imageArray_1)}>
          <Image
            src={image_1_label_2_original}
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 2</p>
        </div>
        <div className={styles.card} onClick={() => handleClick(imageArray_2)}>
          <Image
            src={image_2_label_1_original}
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 1</p>
        </div>
        <div className={styles.card} onClick={() => handleClick(imageArray_3)}>
          <Image
            src={image_3_label_0_original}
            alt=""
            width={200}
            height={200}
          />
          <p className={styles.description}>This is a 0</p>
        </div>
      </div>
      <DrawFreeform
        className={styles.card}
        handleSavedImageData={props.handleSavedImageData}
        handleScaledImage={props.handleScaledImage}
        preprocessImage={preprocessImage}
        handleClick={handleClick}
      />
      <h1 style={{ margin: 'auto', textAlign: 'center', padding: '2rem' }}>
        <b style={{ color: 'black' }}>2.</b> Now lets fetch the latest zkapp
        prediction state
      </h1>
      <div style={{ display: 'grid' }}>
        <button
          className={styles.button}
          onClick={props.onRefreshCurrentNum}
          style={{ margin: 'auto', padding: '2rem' }}
        >
          {' '}
          Get Latest State{' '}
        </button>
        <div style={{ textAlign: 'center' }}>
          Current prediction state in zkApp:{' '}
          {props.state.currentNum!.toString()}{' '}
        </div>
      </div>
      <h1 style={{ margin: 'auto', textAlign: 'center', padding: '2rem' }}>
        <b style={{ color: 'black' }}>3.</b> Finally you can predict the number
        and update the state by sending a transaction
      </h1>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <button
          className={styles.button}
          onClick={props.onSendPredictTransaction}
          disabled={props.creatingTransaction}
          style={{ margin: 'auto', textAlign: 'center', padding: '2rem' }}
        >
          Predict the number and update the state by sending a transaction
        </button>
      </div>
    </div>
  )
}
