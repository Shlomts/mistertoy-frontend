import { useState } from "react"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useDispatch, useSelector } from "react-redux"

import logo from "../assets/img/logo.png"

export function HomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector((storeState) => storeState.count)

    function changeCount(diff) {
        dispatch({ type: CHANGE_BY, diff })
    }

    return (
        <section className="home">
            <section className="home-txt">
                <h2 className="home-h2">Toy shop</h2>
                <p className="home-p">The house for your money </p>
                <p className="small-lttrs">
                    We accept all kinds of payment including PAYPAL and AMAX.
                </p>
            </section>

            <img src={logo} />
        </section>
    )
}
