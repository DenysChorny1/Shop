import React from 'react'
import Products from './Products'
import { useSelector } from 'react-redux'
import Category from './Category'

export default function Home() {
    const {list} = useSelector(({products}) => products)

  return (
    <>
        <Category products={list} amount={list.length} title="Products"/>
    </>
  )
}
