export default function toysReducer(state = { toys: [] }, action) {
    let index
    let toy

    switch(action.type) {
        case 'POPULATE_TOY':
            return {...state, toys: [...state.toys, action.toy]}

        case 'ADD_TOY':
            fetch('http://localhost:4000/toys', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(action.toy) 
            })
            .then(res => console.log("All goot" + res))
            .catch(err => console.log("error: " + err ))
            return {...state, toys: [...state.toys, action.toy]}

        case 'REMOVE_TOY':
            index = state.toys.findIndex(toy => toy.id === action.toyId)
            toy = state.toys[index]
            fetch(`http://localhost:4000/toys/${toy.id}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(action.toy) 
            })
            .then(res => console.log("All goot" + res))
            .catch(err => console.log("error: " + err ))
            return {...state, toys: [...state.toys.slice(0, index), ...state.toys.slice(index + 1)]}
        
        case 'ADD_LIKE':
            index = state.toys.findIndex(toy => toy.id === action.toyId)
            toy = state.toys[index]
            toy.likes += 1
            return {...state, toys: [...state.toys.slice(0, index), toy, ...state.toys.slice(index + 1)]}
        default:
            return state
    }
}