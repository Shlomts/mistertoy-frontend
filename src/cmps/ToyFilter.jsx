import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

import { LabelsList } from '../cmps/LabelsList.jsx'


export function ToyFilter({ filterBy, onSetFilter, labels }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        console.log(filterByToEdit, "filterByToEdit")
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        console.log("value", value)
        console.log("field", field)
        console.log("type", type)
        console.log("target", target)   

        if (type === "select-one") {
            if (value === "yes") value = true
            else if (value === "no") value = false
            else value = ""
        }

        value = type === "number" ? +value : value

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
                <label htmlFor="maxPrice">Max price:</label>
                <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ""}
                    onChange={handleChange}
                />
                <label htmlFor="inStock"></label>
                In stock?
                <select id="in-stock" name="inStock" onChange={handleChange}>
                    <option value="">All</option>
                    <option value="yes">YUP!</option>
                    <option value="no">NOPE..</option>
                </select>

                <LabelsList labels={labels} onChange={handleChange}/>
            </form>
        </section>
    )
}