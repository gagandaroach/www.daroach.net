import React from 'react'
import Link from 'next/link'
import styles from '../styles/DnetNavbar.module.css'

type LinkData = { name: string, href: string }
type Props = { title: string, links: Array<LinkData> } & typeof defaultProps;

const defaultProps = {
  title: "www.daroach.net",
  links: [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Blog",
      href: "/blog"
    },
    {
      name: "About",
      href: "/about"
    },
    {
      name: "Contact",
      href: "/contact"
    }
  ]
}

const DnetNavbar = ({ title, links }: Props) => (
  <nav className={styles.navbar}>
    <div className={styles.navleft}>
      {/* <Link href="/" >www.daroach.net</Link> */}
      {/* <h1>{title.split('|')[0]}</h1> */}
      <Link href="/" >www.daroach.net</Link>
    </div>
    <div className={styles.navright}>
      {
        links.map((linkData, idx) => (
          <Link href={linkData.href} key={idx}>
            <a>{linkData.name}</a>
          </Link>          
        ))
      }
    </div>
  </nav>
)

DnetNavbar.defaultProps = defaultProps;

export default DnetNavbar
