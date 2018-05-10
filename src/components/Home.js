import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
	increment, 
	decrement,
} from '../reducers/counter';

const Home = (props) => {
	return (
		<div>
			<h1>This is home!</h1>
			<p>Counter : { props.count }</p>
			<button onClick={props.increment}>
				Increment
			</button>
			<button onClick={props.decrement}>
				Decrement
			</button>

			<hr/>
			<button onClick={() => props.changePage()}>
				Navigation using redux
			</button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	count: state.counter.count
});

const mapDispatchToProps = (dispatch) => 
	bindActionCreators(
		{
			increment,
			decrement,
			changePage: () => push('about')
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);