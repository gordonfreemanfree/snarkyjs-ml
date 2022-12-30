import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import snarky_v1_001 from '../public/snarky_v1_001.png'

export default function Usecases() {
  return (
    <div className={styles.card3}>
      <h1 className={styles.title}>Future applications</h1>
      <div className={styles.description}>
        <Image src={snarky_v1_001} alt="" width={700} height={500} />
      </div>
      <ul className={styles.description1}>
        <li>
          Proving one is above a certain age by recognizing the date of birth on
          a passport.
        </li>
        <li>
          Verifying the authenticity of documents or other types of media:
          Possibility to prove a certain document or piece of media is genuine
          without revealing its contents. This could be useful for verifying the
          authenticity of legal documents, art, or other valuable items.
        </li>
        <li>
          Verifying the attendance at an event: By taking a picture of attendees
          at an event and using zk-SNARKs to prove that the picture was taken,
          it is possible to verify that someone was actually present at the
          event without revealing their specific identity. This could be useful
          for verifying attendance at conferences, concerts, or other events.
        </li>
        <li>
          Authenticating the location of a product or service: Authenticating
          the location of a product or service by allowing a user to prove that
          they are physically present at a certain location without revealing
          their specific identity or location. This could be useful for
          verifying the location of a product or service for purposes of quality
          control or compliance.
        </li>
      </ul>
    </div>
  )
}
