import { useDispatch, useSelector } from "react-redux"

import { TOGGLE_CART_IS_SHOWN } from "../store/reducers/toy.reducer.js"

import { UserMsg } from "./UserMsg.jsx"
import { ShoppingCart } from "./ShoppingCart.jsx"

export function AppFooter() {
    const dispatch = useDispatch()
    const isCartShown = useSelector(
        (storeState) => storeState.toyModule.isCartShown
    )
    const count = useSelector((storeState) => storeState.userModule.count)
    const toysLength = useSelector(
        (storeState) => storeState.toyModule.toys.length
    )
    const shoppingCartLength = useSelector(
        (storeState) => storeState.toyModule.shoppingCart.length
    )

    return (
        <footer className="app-footer">
            <h5>Currently {toysLength} toys in our shop</h5>
            <h5>
                You have <span>{shoppingCartLength}</span> toy in your Cart &nbsp;
                <a
                    href="#"
                    onClick={(ev) => {
                        ev.preventDefault()
                        dispatch({ type: TOGGLE_CART_IS_SHOWN })
                    }}
                >
                    ({isCartShown ? "hide" : "show"})
                </a>
            </h5>
            <p>Coffeerights to all ©️</p>
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />
        </footer>
    )
}
