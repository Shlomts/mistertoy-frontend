import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p>Name: <span>{toy.name.toLocaleString()}</span></p>
            <p>Labels: <span>{toy.labels.toLocaleString()}</span></p>
            {/* <p>In stock: <span>{toy.inStock}</span></p> */}
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}