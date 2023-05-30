import React from 'react'
import style from '../styles/User.module.css'
import { useDispatch, useSelector } from 'react-redux'
import UserSignUpForm from "./UserSignUpForm";
import UserLoginForm from "./UserLoginForm";
import { toggleForm, toggleFormType } from '../features/user/userSlice'

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  return showForm ? (
    <>
      <div className={style.overlay} onClick={closeForm} />
      {formType === "signup" ? (
        <UserSignUpForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm