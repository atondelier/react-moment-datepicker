"use strict";

import momentPropTypes from 'react-moment-proptypes';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Month from './Month.jsx';
import './Calendar.css';

class Calendar extends React.Component {

    static propTypes = {
        defaultDate: momentPropTypes.momentObj,
        onSelect: React.PropTypes.func,
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

    previousStart() {
        this.setStart(this.state.displayedStartDate.clone().subtract(1, 'month'));
    }

    nextStart() {
        this.setStart(this.state.displayedStartDate.clone().add(1, 'month'));
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
            <div className="calendar">
                <div className="calendar-header">
                    <button
                        className="calendar-btn calendar-monthSwitch--previous"
                        onClick={() => this.previousStart()}
                    > </button>
                    <div
                        className="calendar-currentMonth"
                    >{displayedStartDate.format(headerFormat)}</div>
                    <button
                        className="calendar-btn calendar-monthSwitch--next"
                        onClick={() => this.nextStart()}
                    > </button>
                </div>
                <div className="calendar-body">
                    <ReactCSSTransitionGroup
                        transitionName={this._slideDirection ? `slide-${this._slideDirection}` : ''}
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
                <button className="calendar-footer" onClick={() => onSelect(defaultDate.clone())}>
                    {defaultDate.format(footerFormat)}
                </button>
            </div>
        );
    }
}

export default Calendar;
