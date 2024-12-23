import { Link } from "react-router-dom"

import { ToyPreview } from "./ToyPreview.jsx"
import { utilService } from "../services/util.service.js"
import { userService } from "../services/user.service.js"

export function ToyList({ toys, onRemoveToy, addToCart }) {
    const user = userService.getLoggedinUser()
    
    return (
        <ul className="toy-list">
            {toys.map((toy) => (
                <li className="toy-preview" key={utilService.makeId()}>
                    <ToyPreview toy={toy} />
                    <Link to={`/toy/${toy._id}`}>Details</Link>
                    {user?.isAdmin && (
                        <section className="admin-nav">
                            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                            <div>
                                <button onClick={() => onRemoveToy(toy._id)}>
                                    X
                                </button>
                            </div>
                        </section>
                    )}
                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>
            ))}
        </ul>
    )
}
