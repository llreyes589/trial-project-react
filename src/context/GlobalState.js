import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// Initial State
const initialState = {
    movies: [],
    inputs: {
        title: '',
        description: '',
        director: '',
        released_dt: '',
        id: 0
    }
}

// Create context 
export const GlobalContext = createContext(initialState)

// Provider
export const GlobalProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AppReducer, initialState)


    useEffect(() => {
        fetchMovies()
    }, [])

    // Fetch all movies
    const fetchMovies = async () =>{
        try{
            let {data} = await axios.get('http://localhost:90/api/movies')
            dispatch({type: 'FETCH_MOVIES', payload:data})
        }catch({response}){
            alert(response.statusText)
        }
    }
    
    // Add new movie
    const addMovie = async (movie) =>{
        try{
            let {data} = await axios.post('http://localhost:90/api/movies', movie)
            dispatch({type: 'ADD_MOVIE', payload:data})
        }catch({response}){
            alert(response.statusText)
        }
    }

    // Inputs
    const changeInputs = (movie) =>{
        dispatch({type: 'CHANGE_INPUTS', payload:movie})
    }

    // Edit movie
    const editMovie = async (movie) =>{

        try{
            let {data} = await axios.put(`http://localhost:90/api/movies/${movie.id}`, movie)
            dispatch({type: 'EDIT_MOVIE', payload:data})
        }catch({response}){
            alert(response.statusText)
        }
    }
    
    // delete movie
    const deleteMovie = async(id) =>{
        try{
            await axios.delete(`http://localhost:90/api/movies/${id}`)
            dispatch({type: 'DELETE_MOVIE', payload:id})
        }catch({response}){
            alert(response.statusText)
        }
    }

    return (
        <GlobalContext.Provider value={{
            inputs: state.inputs,
            movies: state.movies,
            fetchMovies,
            addMovie,
            changeInputs,
            editMovie,
            deleteMovie
        }}>
            {children}
        </GlobalContext.Provider>
    )

}