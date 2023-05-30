import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import style from '../styles/Category.module.css'
import { useGetProductsQuery } from '../features/api/apiSlice'
import Products from './Products'
import { useSelector } from 'react-redux'

const Category = ({title}) => {
    const {id} = useParams()
    const {list} = useSelector(({categories}) => categories)

    const defaultValues = {
        title: "",
        price_min: 0,
        price_max: 0,
    }

    const defaultParams = {
        title: "",
        limit: 10,
        offset: 0,
        ...defaultValues
    }

    const [isEnd, setEnd] = useState(false)
    const [cat, setCat] = useState('')
    const [items, setItems] = useState([])
    const [values, setValues] = useState(defaultValues)
    const [params, setParams] = useState(defaultParams)
    const {data, isLoading, isSuccess} = useGetProductsQuery(params)

    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]: value})
    }

    useEffect(() => {
        if(isLoading) return

        if(!data.length) return setEnd(true)

        const products = Object.values(data)
        if(!products.length) return

        setItems((_items) => [..._items, ...products])
    },[data, isLoading])

    useEffect(() => {
        if(!id)return
        setItems([])
        setEnd(false)
        setValues(defaultValues)
        setParams({...defaultParams, categoryId: id})
    },[id])

    useEffect(() => {
        if(!id || !list.length) return

        const {name} = list.find(item => item.id === id * 1)

        setCat(name)
    },[list, id])

    const handleSubmit = (e) => {
        e.preventDefault()
        setItems([])
        setEnd(false)
        setParams({...defaultParams, ...values})
    }

  return (
    <section className={style.wrapper}>
        <h2>{cat}</h2>
        <form className={style.filters} onSubmit={handleSubmit}>
            <div className={style.filter}>
                <input value={values.title} type='text' name='title' placeholder='Product name' onChange={handleChange}/>
            </div>
            <div className={style.filter}>
                <input value={values.price_min} type='number' name='price_min' placeholder='0' onChange={handleChange}/>
                <span>Price from</span>
            </div>
            <div className={style.filter}>
                <input value={values.price_max} type='number' name='price_max' placeholder='0' onChange={handleChange}/>
                <span>Price to</span>
            </div>
            <button type="submit" hidden/>
        </form>
        {isLoading ? (
            <div className='preloader'>loading...</div>
        ) : !isSuccess || !items.length ? (
            <div className={style.back}>
                <span>No results</span>
                <button>Reset</button>
            </div>
        ) : (
            <Products title="" products={items} style={{padding: 0}} amount={items.length}/>
        )}
        {!isEnd && (
            <div className={style.more}>
                <button onClick={() => setParams({...params, offset: params.offset + params.limit})}>Load more</button>
            </div>
        )}
        
    </section>
  )
}

export default Category