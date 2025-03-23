const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload.user, token: action.payload.token };
        case 'LOGOUT':
            return { ...state, user: null, token: '' };
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default authReducer;
