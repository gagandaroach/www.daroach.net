import Link from 'next/link'
import Layout from '../components/Layout'
import DnetBanner from '../components/elements/Banner'
import styles from '../styles/Page.module.css'

const AboutPage = () => (
  <Layout title="Contact | www.daroach.net">
    <DnetBanner
      lead="Contact"
      main=""
    />
    <div className={styles.sec}>
      <h1 className={styles.secHeader}>Email</h1>
      <div>
        <p>gagandaroach@gmail.com</p>
      </div>
    </div>
    <div className={styles.sec}>
      <h1 className={styles.secHeader}>Social Media</h1>
      <div className="flex flex-row space-x-2">
        <p>Github</p>
        <p>LinkedIn</p>
        <p>Instagram</p>
        <p>Twitter</p>
        <p>Facebook</p>
      </div>
    </div>
  </Layout>
)

export default AboutPage
