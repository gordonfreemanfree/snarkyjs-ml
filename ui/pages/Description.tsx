import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import snarky_v1_002 from '../public/snarky_v1_002.png'

export default function Description() {
  return (
    <div className={styles.card3}>
      <h1 className={styles.title}>Summary </h1>
      <p className={styles.description}>
        This project provides a proof of concept for using machine learning
        models with zero-knowledge proofs. It demonstrates the use of zk-SNARKs
        in a machine learning context by implementing a neural network for
        handwritten digit recognition using the MNIST dataset. This neural
        network was completely implemented in zk-SNARK circuits using the
        SnarkyJS library. By using zk-SNARKs in this way, the prover can prove
        that they have drawn a certain handwritten image, which was then
        recognized by the neural network, without revealing the actual image
        itself. This could have potential applications in scenarios where
        privacy and security are important, such as proving that one is older
        than a certain age by presenting a photo of their passport without
        revealing sensitive personal information.
      </p>
      <h1 className={styles.title}>Implementation highlights</h1>
      <p className={styles.description1}>
        Neural Network architecture:
        <li>Input shape: 8x8 Fully connected layer</li>
        <li>
          10 neurons (Relu activation function) Softmax layer for classification
        </li>
      </p>
      <div className={styles.description}>
        <Image src={snarky_v1_002} alt="" width={500} height={500} />
      </div>
      <ul className={styles.description1}>
        <li>
          The weights of the neural network have been trained to be a positive
          value and were cropped to an integer value, so that they could be used
          as field elements. This was done to avoid the use of floating point
          numbers and negative values.
        </li>
        <li>
          The prediction of the image is done within circuits, without
          recursion. We tried to max out the number of layers/neurons that could
          be run in a circuit.
        </li>
        <li>
          The input shape of the original MNIST (28x28) was scaled down to
          (8x8). The reason for that is that bigger image sizes could not be run
          in the current circuit size. That leads to an accuracy of the model of
          about 90%.
        </li>
        <li>
          We spend quite some time on optimizing the scaling factors of the
          weights and the input image. The scaling factors were chosen in a way
          that the weights and the input image are scaled to the same range.
          This way, the weights and the input image can be added and multiplied
          together without overflowing the field elements. This allows us to use
          almost only field elements which makes it efficient.
        </li>
      </ul>
    </div>
  )
}
