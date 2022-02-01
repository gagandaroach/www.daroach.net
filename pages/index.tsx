import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import DnetImage from '../components/DnetImage'


const HomePage = () => (
  <Layout title="Home | www.daroach.net">
    <div className={styles.banner}>
      <h1 className={styles.title}>Welcome to <a href="">Daroach.net!</a></h1>
      <h2>
        You have used the power of the internet to connect to a webserver running in my apartment. Nice.
      </h2>
      <DnetImage src="/outside_tree_home.jpg" footer="Photo of Gagan Daroach taken by Gian Daroach, outside childhood home in Peshtigo, WI, USA." width={2048} height={1536} />
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
        <p>I am a human being from the Planet Earth, born at the turn of the millenium - 1995.</p>
      </div>

      <div className={styles.sec}>
        <h1 className={styles.secHeader}>Web services</h1>
      </div>

      <div className={styles.sec}>
        <h1 className={styles.secHeader}>Debug</h1>
        <div className="flex text-center space-x-2">
          <div className="bg-gray-200 p-5 hover:bg-green-500">
            <Link href="/api" >Link to api</Link>
          </div>
          <div className="bg-gray-200 p-5 hover:bg-green-500">
            <Link href="/api/hits" >Link to api/hits</Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)
export default HomePage
