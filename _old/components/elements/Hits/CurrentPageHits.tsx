import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

type Props = {
    prefix: string,
    suffix: string,
    loading: string,
    error: string
} & typeof defaultProps;

const defaultProps = {
    prefix: "",
    suffix: "",
    loading: "Loading...",
    error: ""
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function CurrPageHits(prefix_str: string, suffix_str: string, loading_str: string, error_str: string) {
    const { data, error } = useSWR('/api/hits', fetcher)
    const router = useRouter()
    console.log(router.basePath)
    if (error) { return <div>{error_str}</div> }
    if (!data || !data['success']) { return <div>{loading_str}</div> }
    return <div>{prefix_str}{data.data.length}{suffix_str}</div>
}

const DnetCurrPageHits = ({ prefix, suffix, loading, error }: Props) => (
    CurrPageHits(prefix, suffix, loading, error)
)

DnetCurrPageHits.defaultProps = defaultProps;
export default DnetCurrPageHits
