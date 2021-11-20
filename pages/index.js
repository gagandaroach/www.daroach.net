import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>www.daroach.net - Home</title>
        <meta name="description" content="my contribution to the virtual world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.banner}>
          <h1 className={styles.title}>Welcome to <a href="">Daroach.net!</a></h1>
          <h2>You have used the power of the internet to connect to a <a
            href="https://www.instagram.com/p/BtSgNa8ni0i/?utm_source=ig_web_options_share_sheet"
            target="_blank" rel="noopener noreferrer">webserver</a> running in my apartment.
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.sec}>
            <h1 className={styles.secHeader}>Web traffic</h1>
          </div>

          {/* <div className={styles.sec}>
            <h1 className={styles.secHeader}>My blog</h1>
          </div> */}

          <div className={styles.sec}>
            <h1 className={styles.secHeader}>About me</h1>
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
        {/* <span>www.daroach.net - running on a high performance webserver in my apartment</span> */}
        <div className="flex justify-center py-5 mx-5">
          <div class="flex flex-col ml-1 mr-auto">
            <span><a href="https://github.com/gagandaroach/daroachnet" target="_blank">Source Code</a></span>
          </div>
          <div className="flex flex-col mr-1 ml-auto">
            <a href="mailto:gagandaroach@gmail.com?Subject=Hello Gagan, I like daroach.net!" target="_blank">
              <span>Gagan Daroach &copy; 2019-2021</span></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
