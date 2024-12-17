import { useSelector } from "react-redux"
import { useEffect } from "react"

import { loadToys, loadLabels } from "../store/actions/toy.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { CharPrice } from "../cmps/CharPrice.jsx"
import { CharInventory } from "../cmps/CharInventory.jsx"
import { CharDates } from "../cmps/CharDates.jsx"

export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const labels = useSelector((storeState) => storeState.toyModule.labels)

    useEffect(() => {
        loadLabels()
        loadToys().catch((err) => {
            showErrorMsg("Cannot load toys!")
        })
    }, [])

    const toysByLabel = toysByLabelObj()

    function toysByLabelObj() {
        return labels.reduce((acc, label) => {
            acc[label] = toys.filter(
                (toy) => toy.labels && toy.labels.includes(label)
            )
            return acc
        }, {})
    }

    return (
        <div>
            <h2>Some Charts</h2>

            <section className="charts">
                <CharPrice labels={labels} toysByLabel={toysByLabel} />
                <CharInventory labels={labels} toysByLabel={toysByLabel} />
                <CharDates labels={labels} />
            </section>
        </div>
    )
}
