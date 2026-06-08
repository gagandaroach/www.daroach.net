import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/elements/Image.module.css'


type Props = {
  src: string,
  footer: string,
  width: number,
  height: number
}

const DnetImage = ({ src, footer, width, height }: Props) => (
  <div className={styles.body}>
    <Image src={src} width={width} height={height} />
    <p>© Gagan Daroach - {footer}</p>
  </div>
)

export default DnetImage
