import React from 'react'
import style from '../styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { sumBy } from '../utils/common'
import { addItemToCart, removeItemFromCart } from '../features/user/userSlice'

const Cart = () => {
    const {cart} = useSelector(({user}) => user)
    const dispatch = useDispatch()

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({...item, quantity}))
    }

    const Removeitem = (id) => {
        dispatch(removeItemFromCart(id))
    }

  return (
    <section className={style.cart}>
        <h2 className={style.title}>Cart</h2>
        {!cart.length ? (
            <div className={style.empty}>Cart is empty</div>
        ) : (<>
            <div  className={style.list}>
                {cart.map((item) => {
                    const {title, category, images, price, id, quantity} = item
                    return <div className={style.item} key={id}>
                        <div className={style.image} style={{backgroundImage: `url(${images[0]})`}}/>
                        <div className={style.info}>
                            <div className={style.name}>{title}</div>
                            <div className={style.category}>{category.name}</div>
                        </div>
                        <div className={style.price}>{price}$</div>
                        <div className={style.quantity}>
                            <div className={style.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                                <svg className='icon'>
                                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`} />
                                </svg>
                            </div>
                            <span>{quantity}</span>
                            <div className={style.plus} onClick={() => changeQuantity(item, quantity + 1)}>
                                <svg className='icon'>
                                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`} />
                                </svg>
                            </div>
                        </div>
                        <div className={style.total}>{price * quantity}$</div>
                        <div className={style.close} onClick={() =>Removeitem(item.id)}>
                            <svg className='icon'>
                                <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
                            </svg>
                        </div>
                    </div>
                })}
            </div>
            <div className={style.actions}>
                <div className={style.total}>
                    Total price: {sumBy(cart.map(({quantity, price}) => quantity * price))}$
                </div>
            </div>
            </>
        )}
    </section>
  )
}

export default Cart