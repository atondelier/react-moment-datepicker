"use strict";

import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import React from 'react';
import classnames from 'classnames';
import './Day.css';

const Day = ({date, onClick, displayedStartDate, isSelected, isDefault}) => {

    const classes = classnames('rm_day', {
        'rm_day--outside': date.month() !== displayedStartDate.month(),
        'rm_day--past': date.diff(moment().startOf('day'), 'day') < 0,
        'rm_day--selected': isSelected,
        'rm_day--default': isDefault
    });

    return (
        <div onClick={onClick} className={classes}>
            <button className="rm_day-label">
                {date.date()}
            </button>
        </div>
    );
};

Day.PropTypes = {
    date: momentPropTypes.momentObj,
    onClick: React.PropTypes.func,
    displayedStartDate: momentPropTypes.momentObj,
    isSelected: React.PropTypes.bool,
    isDefault: React.PropTypes.bool
};

export default Day;
