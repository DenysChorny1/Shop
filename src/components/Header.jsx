import React, { useEffect, useState } from 'react';
import style from '../styles/Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../features/user/userSlice';
import { useGetProductsQuery } from '../features/api/apiSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, cart } = useSelector(({ user }) => user);
  const [searchValues, setSearchValues] = useState('');
  const [values, setValues] = useState({ name: 'Guest', avatar: '' });

  const { data, isLoading } = useGetProductsQuery({ title: searchValues });

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValues(value);
  };

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <Link to={ROUTES.HOME}>LOGO</Link>
      </div>
      <div className={style.info} onClick={handleClick}>
        <div
          className={style.avatar}
          style={{ backgroundImage: `url(${values.avatar})` }}
        ></div>
        <div className={style.username}>{values.name}</div>
      </div>
      <form className={style.form}>
        <div className={style.icon}>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
          </svg>
        </div>
        <div className={style.input}>
          <input
            type="search"
            name="search"
            placeholder="Search"
            autoComplete="off"
            value={searchValues}
            onChange={handleSearch}
          />
        </div>
        {searchValues && (
          <div className={style.box}>
            {isLoading ? (
              'Loading'
            ) : !data.length ? (
              'No results'
            ) : (
              data.map(({ title, images, id }) => {
                return (
                  <Link
                    className={style.item}
                    key={id}
                    to={`/products/${id}`}
                    onClick={() => setSearchValues('')}
                  >
                    <div
                      className={style.image}
                      style={{ backgroundImage: `url(${images[0]})` }}
                    />
                    <div className={style.title}>{title}</div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </form>
      <div className={style.account}>
        <Link to={ROUTES.CART} className={style.cart}>
          <svg className="icon-cart">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
          </svg>
          {!!cart.length && (
              <span className={style.count}>{cart.length}</span>
            )}
        </Link>
      </div>
    </header>
  );
}