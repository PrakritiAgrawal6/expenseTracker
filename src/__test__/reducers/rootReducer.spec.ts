import rootReducer from "../../redux/reducers/rootReducer"
import userReducer from "../../redux/reducers/userReducer"

const action = {
    type: "",
    payload: undefined
}

describe('Given RootReducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            loginUser: userReducer(undefined, action),

        }
        expect(rootReducer(undefined, action)).toEqual(initialState)

    })
})