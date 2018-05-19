export const CLEAR_FIELD_AFTER_LOGIN = 'CLEAR_FIELD_AFTER_LOGIN';
export const USER_IS_LOGIN = 'USER_IS_LOGIN';
export const USER_IS_LOGOUT = 'USER_IS_LOGOUT';

const initialState = {
	loginEmail: '',
   loginPassword: '',
   firstName: '',
   firstNameStatus: true,
   lastName: '',
   lastNameStatus: true,
   email: '',
   password: '',
   confirmPassword: '',
   confirmPasswordStatus: true,
   loginErrorMessage: [],
   registerErrorMessage: [],
   isLogin: false
};

// reducers
/* NOTE : REMEMBER IMMUTABILITY PRINCIPLE
DONT FORGET TO USE ...STATE WHEN RETURNING
*/

export default (state = initialState, action) => {
	switch(action.type) {
		case CLEAR_FIELD_AFTER_LOGIN:
			return {
				...state,
				loginEmail: '',
				loginPassword: ''
			};
		case USER_IS_LOGIN:
			return {
				...state,
				isLogin: true
			};
		case USER_IS_LOGOUT:
			return {
				...state,
				isLogin: false
			};	
		default:
			return state;
	}
};

// actions
// async already supported
export const clearLoginFieldAfterLogin = () => {
	return dispatch => {
		dispatch({
			type: CLEAR_FIELD_AFTER_LOGIN
		});	
	};
};

export const isLogin = () => {
	return dispatch => {
		dispatch({
			type: USER_IS_LOGIN
		});	
	};
};

export const isLogout = () => {
	return dispatch => {
		dispatch({
			type: USER_IS_LOGOUT
		});	
	};
};