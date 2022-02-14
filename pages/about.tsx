import Link from 'next/link'
import Layout from '../components/Layout'
import DnetImage from '../components/elements/Image'
import DnetBanner from '../components/elements/Banner'
import styles from '../styles/Page.module.css'

const AboutPage = () => (
  <Layout title="About | www.daroach.net">
    <DnetBanner 
      lead="About"
      main=""
    />
    <DnetImage src="/outside_tree_home.jpg" footer="Photo of Gagan Daroach taken by Gian Daroach, outside childhood home in Peshtigo, WI, USA." width={2048} height={1536} />
  </Layout>
)

export default AboutPage
