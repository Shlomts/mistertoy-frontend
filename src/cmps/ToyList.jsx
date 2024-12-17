import { ToyPreview } from "./ToyPreview.jsx"
import { utilService } from "../services/util.service.js"

export function ToyList({ toys, onRemoveToy, addToCart }) {
    return (
        <ul className="toy-list">
            {toys.map((toy) => (
                <li className="toy-preview" key={utilService.makeId()}>
                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>✖️</button>
                    </div>
                    <ToyPreview toy={toy} />
                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>
            ))}
        </ul>
    )
}
