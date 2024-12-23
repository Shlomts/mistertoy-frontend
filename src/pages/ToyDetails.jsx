import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useNavigate } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { userService } from "../services/user.service.js"

export function ToyDetails() {
    const dispatch = useDispatch()

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    const user = useSelector((storeState) => storeState.userModule.loggedInUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toyFromStorage = await toyService.getById(toyId)
            setToy(toyFromStorage)
        } catch (err) {
            console.log("Had issues in toy details", err)
            navigate("/toy")
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section key={toy._id} className="toy-details">
            <h3>{toy.name}</h3>
            {!toy.inStock && <h4>OUT OF STOCK</h4>}
            <h5>Only: ${toy.price} !!</h5>
            {toy.labels?.length > 0 && (
                <p>
                    Labels:{" "}
                    {toy.labels.map((label) => (
                        <div>{label}</div>
                    ))}
                </p>
            )}
            {toy.msgs?.length > 0 && (
                <section>
                    Messages:
                    {toy.msgs.map((msg) => (
                        <article key={msg._id}>
                            {msg.txt}
                            <br />
                            <span>By: {msg.by.fullname}</span>
                        </article>
                    ))}
                </section>
            )}
            {user?.isAdmin && (
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            )}
             &nbsp;
            <Link to={`/toy`}>Back</Link>
            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
        </section>
    )
}
