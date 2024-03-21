import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import DnetNavbar from './elements/Navbar'
import DnetFooter from './elements/Footer'
import styles from '../styles/Layout.module.css'

type Props = {
  children?: ReactNode
  title?: string
}

// Head
const description = "my contribution to the virtual world - a programmar's website"

// footer
const origYear = 2019;
const currYear = new Date().getFullYear();
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
    <DnetNavbar title={title} />
    {children}
    <DnetFooter />
  </div>
)

export default Layout
