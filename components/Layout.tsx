import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import DnetNavbar from './elements/Navbar'
import styles from '../styles/Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

// Head
const description = "my contribution to the virtual world - a programmar's website"

// footer
const origYear = 2019;
const currYear =  new Date().getFullYear();
const webSource = "https://github.com/gagandaroach/www.daroach.net";

const Layout = ({ children, title = 'www.daroach.net' }: Props) => (
  <div className={styles.main}>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
    </Head>
    <header>
      <DnetNavbar title={title} />
    </header>
    {children}
    <footer className={styles.footer}>
      {/* <span>www.daroach.net - running on a high performance webserver in my apartment</span> */}
      <span>Gagan Daroach &copy; {origYear}-{currYear}</span>
      <span><a href={webSource} rel="noreferrer" target="_blank">Website Source Code</a></span>
      {/* <span><a href="mailto:gagandaroach@gmail.com?Subject=www.daroach.net contact me&Body=Hello Gagan, I like daroach.net!" rel="noreferrer" target="_blank">Contact Me (email)</a></span> */}
    </footer>
  </div>
)

export default Layout
