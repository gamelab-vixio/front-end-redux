import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';
import { Token } from '../../ui';

class RatingStars extends Component {
    static propTypes = {
        rating: PropTypes.number.isRequired,
        maxRating: PropTypes.number,
    };

    static defaultProps = {
        maxRating: 5,
    }

    render() {
        const { rating, maxRating } = this.props;
        return (
            <div className='rating-stars'>
                { [...Array(rating)].map((x, index) => <FaStar key={index} size={15} color={Token.color.yellow}></FaStar>) }
                { [...Array(maxRating-rating)].map((x, index) => <FaStarO key={index} size={15} color={Token.color.yellow}></FaStarO>) }
                { <span className="star-average">{String(rating) + '/' + String(maxRating)}</span> }
            </div>
        );
    }
}

export default RatingStars;
