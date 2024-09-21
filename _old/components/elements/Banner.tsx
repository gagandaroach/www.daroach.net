import React from 'react'
import styles from '../../styles/elements/Banner.module.css'

type Props = {
  lead: string,
  main: string
} & typeof defaultProps;

const defaultProps = {
  lead: "Welcome to www.Daroach.net!",
  main: "You have used the power of the internet to connect to a webserver running in my apartment. 💯"
}

const DnetBanner = ({ lead, main }: Props) => (
  <div className={styles.banner}>
    <h1 className={styles.title}>{lead}</h1>
    <h2>{main}</h2>
  </div>
)

DnetBanner.defaultProps = defaultProps;

export default DnetBanner
