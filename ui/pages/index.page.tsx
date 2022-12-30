import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Mina, isReady, PublicKey, fetchAccount } from 'snarkyjs'
import type { SmartSnarkyNet } from '../../contracts/src/'

import { Demo } from './Demo'

export default function Home() {
  useEffect(() => {
    ;(async () => {
      await isReady
      const { SmartSnarkyNet } = await import('../../contracts/build/src/')

      // Update this to use the address (public key) for your zkApp account
      // To try it out, you can try this address for an example "Add" smart contract that we've deployed to
      // Berkeley Testnet B62qqkb7hD1We6gEfrcqosKt9C398VLp1WXeTo1i9boPoqF7B1LxHg4
      const zkAppAddress =
        'B62qrSgTkaLZAJjcgBp7SH7BXoN4UdgxBwRiBx9mJ34TyivW2MAV3KP'
      // This should be removed once the zkAppAddress is updated.
      if (!zkAppAddress) {
        console.error(
          'The following error is caused because the zkAppAddress has an empty string as the public key. Update the zkAppAddress with the public key for your zkApp account, or try this address for an example "Add" smart contract that we deployed to Berkeley Testnet: B62qqkb7hD1We6gEfrcqosKt9C398VLp1WXeTo1i9boPoqF7B1LxHg4',
        )
      }

      const zkAppInstance = new SmartSnarkyNet(
        PublicKey.fromBase58(zkAppAddress),
      )
    })()
  }, [])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.card2}>
          <h1 className={styles.title}>Neural Nets on Snarkyjs</h1>

          <p className={styles.description}>
            {' '}
            {/* <code className={styles.code}>pages/index.tsx</code> */}
          </p>

          {/* <ImageProcessor /> */}

          {/* <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div> */}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
