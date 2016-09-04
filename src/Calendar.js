"use strict";

import momentPropTypes from 'react-moment-proptypes';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Month from './Month.js';
import './Calendar.css';

class Calendar extends React.Component {

    static propTypes = {
        defaultDate: momentPropTypes.momentObj,
        onSelect: React.PropTypes.func,
        onNavigate: React.PropTypes.func,
        date: momentPropTypes.momentObj,
        dayProps: React.PropTypes.object,
        DayComponent: React.PropTypes.func,
        headerFormat: React.PropTypes.string,
        footerFormat: React.PropTypes.string,
        timezone: React.PropTypes.string
    };

    state = {
        displayedStartDate: null
    };

    _slideDirection = '';

    componentWillMount() {
        this.resetStartFromProps();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timezone !== this.props.timezone) {
            this.resetStartFromProps(nextProps);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const dayDiff = nextState.displayedStartDate.diff(this.state.displayedStartDate, 'days');
        this._slideDirection = dayDiff > 1 ?
            'right' : dayDiff < -1 ?
            'left' : '';
    }

    resetStartFromProps(props = this.props) {
        let date = (props.date || props.defaultDate).clone();
        if (props.timezone) {
            date.tz(props.timezone);
        }
        this.resetStartFromDate(date.startOf('month'));
    }

    resetStartFromDate(date = this.props.date) {
        this.setStart(date.clone().startOf('month'));
    }

    setStart(displayedStartDate) {
        this.setState({displayedStartDate});
    }

    translateStart(amount, unit) {
        const target = this.state.displayedStartDate.clone().add(amount, unit);
        this.setStart(target);
        if (this.props.onNavigate && amount) {
            this.props.onNavigate(amount < 0 ? 'previous' : 'next', unit);
        }
    }

    render() {

        const {
            defaultDate,
            onSelect,
            date,
            dayProps,
            DayComponent,
            headerFormat,
            footerFormat,
            timezone
        } = this.props;

        let {
            displayedStartDate
        } = this.state;

        return (
            <div className="rm_calendar">
                <div className="rm_calendar-header">
                    <button
                        className="rm_calendar-btn rm_calendar-monthSwitch rm_calendar-monthSwitch--previous"
                        onClick={() => this.translateStart(-1, 'month')}
                    >{'<'}</button>
                    <div
                        className="rm_calendar-currentMonth"
                    >{displayedStartDate.format(headerFormat)}</div>
                    <button
                        className="rm_calendar-btn rm_calendar-monthSwitch rm_calendar-monthSwitch--next"
                        onClick={() => this.translateStart(1, 'month')}
                    >{'>'}</button>
                </div>
                <div className="rm_calendar-body">
                    <ReactCSSTransitionGroup
                        transitionName={this._slideDirection ? `rm_slide-${this._slideDirection}` : ''}
                        transitionEnterTimeout={100}
                        transitionLeaveTimeout={100}
                    >
                        <Month
                            key={displayedStartDate.format('YYYY-MM-DD')}
                            displayedStartDate={displayedStartDate}
                            date={date}
                            defaultDate={defaultDate}
                            DayComponent={DayComponent}
                            dayProps={dayProps}
                            onSelect={onSelect}
                            timezone={timezone}
                        />
                    </ReactCSSTransitionGroup>
                </div>
                <button className="rm_calendar-footer" onClick={() => onSelect(defaultDate.clone())}>
                    {defaultDate.format(footerFormat)}
                </button>
            </div>
        );
    }
}

export default Calendar;
