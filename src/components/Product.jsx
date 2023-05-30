import React, { useEffect, useState } from 'react'
import style from '../styles/Product.module.css'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../features/user/userSlice'


const Product = (item) => {
    const {images, title, price, description} = item
    const dispatch = useDispatch()
    const [curentImage, setCurentImage] = useState()

    useEffect(() => {
        if(!images.length) return
        setCurentImage(images[0])
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item))
    }
  return (
    <section className={style.product}>
        <div className={style.images}>
            <div className={style.current} style={{backgroundImage: `url(${curentImage})`}}/>
            <div className={style['images-list']}>
                {images.map((image, i) => (
                    <div key={i}
                        className={style.image}
                        style={{backgroundImage: `url(${image})`}}
                        onClick={() => {setCurentImage(image)}}
                    />
                ))}
            </div>
        </div>
        <div className={style.info}>
            <h2 className={style.title}>{title}</h2>
            <div className={style.price}>
                {price}$
            </div>
            <p className={style.description}>{description}</p>
            <div className={style.actions}>
                <button onClick={addToCart} className={style.add}>Add to cart</button>
            </div>
        </div>
    </section>
  )
}

export default Product