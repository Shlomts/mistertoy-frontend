import { ToyPreview } from "./ToyPreview.jsx"
import { utilService } from "../services/util.service.js"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    return (
        <ul className="toy-list">
            {toys.map((toy) => (
                <li className="toy-preview" key={utilService.makeId()}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>
            ))}
        </ul>
    )
}
