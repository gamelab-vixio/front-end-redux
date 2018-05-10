export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

const initialState = {
	count: 1
};

// reducers
/* NOTE : REMEMBER IMMUTABILITY PRINCIPLE
DONT FORGET TO USE ...STATE WHEN RETURNING
*/

export default (state = initialState, action) => {
	switch(action.type) {
		case INCREMENT:
			return {
				...state,
				count : state.count + 1
			};
		case DECREMENT:
			return {
				...state,
				count: state.count - 1
			};
		default:
			return state;
	}
};

// actions
// async already supported
export const increment = () => {
	return dispatch => {
		dispatch({
			type: INCREMENT
		});	
	};
};

export const decrement = () => {
	return dispatch => {
		dispatch({
			type: DECREMENT
		});
	};
};