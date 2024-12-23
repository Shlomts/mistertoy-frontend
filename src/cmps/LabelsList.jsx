import { useState } from "react"

import { useTheme } from "@mui/material/styles"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Chip from "@mui/material/Chip"
import Box from "@mui/material/Box"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(label, labelOpts, theme) {
    return {
        fontWeight: labelOpts.includes(label)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    }
}

export function LabelsList({ labels, onChange }) {
    const theme = useTheme()
    const [labelOpts, setLabelOpts] = useState([])

    const handleChange = (ev) => {
        onChange(ev)
        const {
            target: { value },
        } = ev
        setLabelOpts(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        )
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Label</InputLabel>
                <Select
                    name="labels"
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={labelOpts}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {labels.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, labelOpts, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
