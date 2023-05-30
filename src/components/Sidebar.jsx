import React from 'react';
import style from '../styles/Sidebar.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories);
  const limitedList = list.slice(0, 5);

  return (
    <section className={style.sidebar}>
      <nav>
        <ul className={style.menu}>
          <li>
            <Link
              className={({ isActive }) => `${style.link} ${isActive ? style.active : ''}`}
              to={``}
            >
              All
            </Link>
          </li>
          {limitedList.map((el) => (
            <li key={el.id}>
              <Link
                className={({ isActive }) => `${style.link} ${isActive ? style.active : ''}`}
                to={`/categories/${el.id}`}
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;