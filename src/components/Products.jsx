import React from 'react'
import style from '../styles/Products.module.css'
import { Link } from 'react-router-dom'


const Products = ({title, products, amount}) => {
    const list = products.filter((_, i) => i < amount)

  return (
    <section className={style.products}>
        {title && <h2>{title}</h2>}
        <div className={style.list}>
            {list.map(({id, images, title, category: {name: cat}, price}) => (
                <Link to={`/products/${id}`} key={id} className={style.product}>
                    <div className={style.image} style={{backgroundImage: `url(${images[0]})`}}/>
                    <div className={style.wrapper}>
                        <h3 className={style.title}>{title}</h3>
                        <div className={style.cat}>{cat}</div>
                        <div className={style.info}>
                            <div className={style.prices}>
                                <div className={style.price}>{price}$</div>
                                <div className={style.oldPrice}>{Math.floor(price * 0.8)}$</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        
    </section>
  )
}

export default Products