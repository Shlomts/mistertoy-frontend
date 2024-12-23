import { useEffect, useRef, useState } from "react"
import { Formik, Form, Field } from "formik"

import { utilService } from "../services/util.service.js"
import { LabelsList } from "../cmps/LabelsList.jsx"
import { TextField } from "@mui/material"


export function ToyFilter({ filterBy, onSetFilter, labels }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        // console.log(filterByToEdit, "filterByToEdit")
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        if (type === "select-one") {
            if (value === "yes") value = true
            else if (value === "no") value = false
            else value = ""
        }

        value = type === "number" ? +value : value

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const defaultValues = {
        name: "",
        price: 0,
        inStock: false,
    }

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <Formik initialValues={defaultValues} onSubmit={(values) => {}}>
                {() => (
                    <Form className="formik">
                        <Field
                            as={CustomInput}
                            name="txt"
                            label="Name"
                            type="text"
                            placeholder="By name"
                            value={filterByToEdit.txt}
                            onChange={handleChange}
                        />
                        <Field
                            as={CustomInput}
                            name="maxPrice"
                            label="Max price"
                            type="number"
                            placeholder="By max price"
                            value={filterByToEdit.maxPrice}
                            onChange={handleChange}
                        />
                        <LabelsList labels={labels} onChange={handleChange} />
                        <label htmlFor="inStock"></label>
                        In stock?
                        <select
                            id="in-stock"
                            name="inStock"
                            onChange={handleChange}
                        >
                            <option value="">All</option>
                            <option value="yes">YES! 😍</option>
                            <option value="no">NO.. 💩</option>
                        </select>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

function CustomInput(props) {
    return <TextField {...props} id="standard-basic" variant="standard" />
}
