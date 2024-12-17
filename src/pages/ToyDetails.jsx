import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
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
            <p key={utilService.getRandomIntInclusive(1, 10000)}>
                Labels:{" "}
                {toy.labels.map((label) => (
                    <span>{label} | </span>
                ))}
            </p>
            {toy.msgs && toy.msgs.length > 0 && (
                <section>
                    Masseges:
                    {toy.msgs.map((msg) => (
                        <article key={msg._id}>
                            {msg.txt}
                            <br />
                            <span>By: {msg.by.fullname}</span>
                        </article>
                    ))}
                </section>
            )}
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
        </section>
    )
}
