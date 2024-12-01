import { useDispatch, useSelector } from 'react-redux'

import { REMOVE_TOY_FROM_TOYT } from '../store/reducers/toy.reducer.js'
import { checkout } from '../store/actions/user.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function ShoppingCart({ isToytShown }) {
    const dispatch = useDispatch()
    const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function removeFromToyt(toyId) {
        console.log(`Todo: remove: ${toyId} from toyt`)
        dispatch({ type: REMOVE_TOY_FROM_TOYT, toyId })
    }

    function getToytTotal() {
        return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getToytTotal()
        checkout(amount)
            .then(()=>{
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(()=>{
                showErrorMsg('There was a problem checking out!')
            })
    }

    if (!isToytShown) return <span></span>
    const total = getToytTotal()
    return (
        <section className="toyt" >
            <h5>Your Toyt</h5>
            <ul>
                {
                    shoppingCart.map((toy, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromToyt(toy._id)
                        }}>x</button>
                        {toy.vendor} | ${toy.price}
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
