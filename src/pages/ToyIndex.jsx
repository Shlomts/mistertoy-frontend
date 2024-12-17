import { toyService } from "../services/toy.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

import { ADD_TOY_TO_CART } from "../store/reducers/toy.reducer.js"
import {
    loadToys,
    removeToyOptimistic,
    saveToy,
    setFilterBy,
    loadLabels,
} from "../store/actions/toy.actions.js"

import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const labels = useSelector((storeState) => storeState.toyModule.labels)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const isLoading = useSelector(
        (storeState) => storeState.toyModule.isLoading
    )

    useEffect(() => {
        loadToys().catch((err) => {
            showErrorMsg("Cannot load toys!")
        })
    }, [filterBy])

    useEffect(() => {
        loadLabels()
    }, [])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg("Toy removed")
        } catch (err) {
            console.log("Toy Index > can't remove toy >>", err)
            showErrorMsg("Cannot remove toy")
            throw err
        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        try {
            const savedToy = await saveToy(toyToSave)
            console.log(savedToy, "savedToy")
            showSuccessMsg(`Toy added (${savedToy.name})`)
        } catch (err) {
            console.log("Had issues in toy details", err)
            showErrorMsg("Cannot add toy")
        }
    }

    async function onEditToy(toy) {
        const price = +prompt("New price?")
        const cartoSave = { ...toy, price }

        try {
            const savedToy = await saveToy(cartoSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            showErrorMsg("Cannot update toy")
            console.log("async storage service -> Cannot remove entity >>", err)
            throw err
        }
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg("Added to Cart")
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <button className="add-btn" onClick={onAddToy}>
                    Add Random Toy ⛐
                </button>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                    labels={labels}
                />
                {!isLoading ? (
                    <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                ) : (
                    <div>Loading...</div>
                )}
                <hr />
            </main>
        </div>
    )
}
