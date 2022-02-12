import Link from 'next/link'
import styles from '../styles/Page.module.css'
import Layout from '../components/Layout'
import DnetBanner from '../components/DnetBanner'


const HomePage = () => (
  <Layout title="Home | www.daroach.net">
    
    <DnetBanner />

    <div className={styles.content}>
      <div className={styles.sec}>
        <h1 className={styles.secHeader}>Web traffic</h1>
      </div>

      {/* <div className={styles.sec}>
      <h1 className={styles.secHeader}>My blog</h1>
    </div> */}

      <div className={styles.sec}>
        <h1 className={styles.secHeader}>About</h1>
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
