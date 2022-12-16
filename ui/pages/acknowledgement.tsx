import React from 'react'
import styles from '../styles/Home.module.css'

export default function Acknowledgement() {
  return (
    <div className={styles.card3}>
      <h1 className={styles.title}>Acknowledgement & further work</h1>

      <ul className={styles.description1}>
        <li>
          The project used{' '}
          <a
            href="https://github.com/Makalfo/SnarkyNet-MNIST-Digits"
            className={styles.link}
          >
            Malkofos SnarkyNet-MNIST-Digits
          </a>{' '}
          as a starting point, but improved the concept of zk ML Application by
          porting the prediction into a circuit.
        </li>
        <li>
          The current implementation uses a fully connected Multi Layer
          Perceptron. Implementing a convolutional layer could increase the
          accuracy of the models
        </li>
        <li>Increasing the size of the input image and the model.</li>
        <li>
          Using recursion to implement the model. This would allow us to use a
          bigger model.
        </li>
      </ul>
    </div>
  )
}
