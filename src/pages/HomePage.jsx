import { useState } from "react"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useDispatch, useSelector } from "react-redux"

import logo from '../assets/img/logo.png'

export function HomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.count)

    function changeCount(diff) {
        dispatch({ type: CHANGE_BY, diff })
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            {/* <img src="../src/assets/img/logo.png" /> */}
            <img src={logo} />
        </section >
    )
}