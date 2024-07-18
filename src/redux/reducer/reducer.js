const INITIAL_STATE = {
    isShow: false,
    currentEtat: null,
    dataFiltre: [],
    selected: {}
}

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MODAL_SHOW':
            return{...state, isShow: action.payload.show};
        case 'CURRENT_ETAT':
            return{...state, currentEtat: action.payload.current_etat};
        case 'ADD_DATA':
            return{...state, dataFiltre: action.payload.data};
        case 'ADD_SELECTED':
            return{...state, selected: action.payload.data};
        default:
            return state;
    }
}