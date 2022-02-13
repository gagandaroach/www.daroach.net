import React from 'react'
import Link from 'next/link'
import styles from '../styles/DnetNavbar.module.css'

type Props = { title: string } & typeof defaultProps;

const defaultProps = {
  title: ""
}

const DnetNavbar = ({ title }: Props) => (
  <nav className={styles.navbar}>
    <div className={styles.navleft}>
      {/* <Link href="/" >www.daroach.net</Link> */}
      <Link href="/" >{title}</Link>
      {/* <h1>{title.split('|')[0]}</h1> */}
    </div>
    <div className={styles.navright}>
      <Link href="/">
        <a>Home</a>
      </Link>
      <text>|</text>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <text>|</text>
      <Link href="/about">
        <a>About</a>
      </Link>
      <text>|</text>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </div>
  </nav>
)

DnetNavbar.defaultProps = defaultProps;

export default DnetNavbar
