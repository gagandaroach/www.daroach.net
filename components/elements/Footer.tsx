import React from 'react'
import Link from 'next/link'
import styles from '../../styles/elements/Footer.module.css'

// footer
const origYear = 2019;
const currYear = new Date().getFullYear();
const webSource = "https://github.com/gagandaroach/www.daroach.net";

const DnetFooter = () => (
    <footer className={styles.footer}>
        {/* <span>www.daroach.net - running on a high performance webserver in my apartment</span> */}
        <span>Gagan Daroach &copy; {origYear}-{currYear}</span>
        <span><a href={webSource} rel="noreferrer" target="_blank">Website Source Code</a></span>
        {/* <span><a href="mailto:gagandaroach@gmail.com?Subject=www.daroach.net contact me&Body=Hello Gagan, I like daroach.net!" rel="noreferrer" target="_blank">Contact Me (email)</a></span> */}
        {/* <span><a href="mailto:gagandaroach@gmail.com?Subject=www.daroach.net contact me&Body=Hello Gagan, I like daroach.net!" rel="noreferrer" target="_blank">Contact Me (email)</a></span> */}
        <Link href="/contact">Contact</Link>
    </footer>
)

export default DnetFooter
