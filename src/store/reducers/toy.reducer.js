import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

//* Shopping toyt
export const TOGGLE_TOYT_IS_SHOWN = 'TOGGLE_TOYT_IS_SHOWN'
export const ADD_TOY_TO_TOYT = 'ADD_TOY_TO_TOYT'
export const REMOVE_TOY_FROM_TOYT = 'REMOVE_TOY_FROM_TOYT'
export const CLEAR_TOYT = 'CLEAR_TOYT'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    isToytShown: false,
    shoppingCart: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    lastToys: []
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }

        //* Shopping toyt
        case TOGGLE_TOYT_IS_SHOWN:
            return { ...state, isToytShown: !state.isToytShown }

        case ADD_TOY_TO_TOYT:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.toy]
            }

        case REMOVE_TOY_FROM_TOYT:
            const shoppingCart = state.shoppingCart.filter(toy => toy._id !== action.toyId)
            return { ...state, shoppingCart }

        case CLEAR_TOYT:
            return { ...state, shoppingCart: [] }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }

        default:
            return state
    }
}