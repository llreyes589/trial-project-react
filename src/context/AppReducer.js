export default (state, action) =>{
    switch (action.type) {
        // movies
        case 'FETCH_MOVIES':
            return {...state, movies: action.payload}
        case 'ADD_MOVIE':
            return {...state, movies: [action.payload, ...state.movies]}
        case 'EDIT_MOVIE':
            const index = state.movies.findIndex(movie => movie.id === action.payload.id); //finding index of the item
            const newArray = [...state.movies]; //making a new array
            newArray[index] = action.payload //changing value in the new array
            return { 
            ...state, //copying the orignal state
            movies: newArray, //reassingning movies to new array
            }
        case 'DELETE_MOVIE':
            return {...state, movies: state.movies.filter(movie=> movie.id !== action.payload)}

            // Inputs
        case 'CHANGE_INPUTS':
            // console.log(action.payload)
            return {...state, inputs: { ...state.inputs,
                title: action.payload.title,
                description: action.payload.description,
                director: action.payload.director,
                released_dt: action.payload.released_dt,
                id: action.payload.id,
             }}


        default:
            return state;
    }

}