import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy, loadLabels } from "../store/actions/toy.actions.js"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LabelsList } from '../cmps/LabelsList.jsx'


export function ToyEdit() {
    const navigate = useNavigate()

    const { toyId } = useParams()
    const [toytoEdit, setToytoEdit] = useState(toyService.getEmptyToy())
    const labels = useSelector(storeState => storeState.toyModule.labels)


    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    useEffect(() => {
        loadLabels()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToytoEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target

        value = type === 'number' ? +value : value
        if(type === 'checkbox') value = target.checked ? true : false
        setToytoEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toytoEdit.price) toytoEdit.price = 1000
        saveToy(toytoEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toytoEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} >
                <label htmlFor="name">Name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name..."
                    value={toytoEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toytoEdit.price}
                    onChange={handleChange}
                />
                <label htmlFor="labels">Labels : 
                <LabelsList labels={labels} onChange={handleChange}/>
                </label>

                <label htmlFor="inStock">In Stock? </label>
                <input type="checkbox"
                    name="inStock"
                    id="in-stock"
                    onChange={handleChange}
                />

                <div>
                    <button>{toytoEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}