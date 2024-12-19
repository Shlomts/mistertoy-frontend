import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { TOGGLE_CART_IS_SHOWN } from "../store/reducers/toy.reducer.js"
import { logout } from "../store/actions/user.actions.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from "./LoginSignup.jsx"

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg("logout successfully")
        } catch (err) {
            showErrorMsg("OOPs try again")
        }
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                    <a onClick={onToggleCart} href="#">
                        Cart 🛒{" "}
                    </a>
                </nav>
                <h1>Mister 🧸 Toy</h1>
            </section>
            {user ? (
                <section className="head-user">
                    <span to={`/user/${user._id}`}>Hi {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                    {user.balance ? (
                        <h3> Your Balance: ${user.balance.toLocaleString()}</h3>
                    ) : (
                        <h3>Please add to balance</h3>
                    )}
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
