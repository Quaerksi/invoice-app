import Head from 'next/head'
import Image from 'next/image' // use Image !!!!
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Invoice App</title>
        <meta name="description" content="A Frontend Mentor Challenge" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <main className={styles.main}>
        <p>main</p>
      </main>

      <footer className={styles.footer}>
        <p>footer</p>
      </footer>
    </div>
  )
}
