"use strict";

import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import 'moment-timezone';
import React from 'react';
import classnames from 'classnames';
import Popover from 'react-popover';
import Calendar from './Calendar.js';
import './DatePicker.css';

class DatePicker extends React.Component {

    static propTypes = {
        inline: React.PropTypes.bool,
        date: momentPropTypes.momentObj,
        onSelect: React.PropTypes.func,
        defaultDate: momentPropTypes.momentObj,
        DayComponent: React.PropTypes.func,
        headerFormat: React.PropTypes.string,
        footerFormat: React.PropTypes.string,
        timezone: React.PropTypes.string,
        popoverProps:  React.PropTypes.object,
        dayProps: React.PropTypes.oneOf([React.PropTypes.object, React.PropTypes.func]),
        classNameModifier: React.PropTypes.string
    };

    state = {
        isOpen: false
    };

    show = () => this.setState({isOpen: true});
    hide = () => this.setState({isOpen: false});

    render() {

        const {
            inline,
            date,
            onSelect,
            defaultDate,
            DayComponent,
            headerFormat,
            footerFormat,
            children,
            timezone,
            popoverProps,
            dayProps,
            classNameModifier
        } = this.props;

        const {
            preferPlace = 'below',
            ...otherPopoverProps
        } = popoverProps || {};

        const {
            isOpen
        } = this.state;

        const classes = classnames(
            'rm_datepicker',
            classNameModifier && `rm_datepicker--${classNameModifier}`,
            inline || 'rm_datepicker--popover'
        );

        const datepicker = <div className={classes}>
            <Calendar
                ref="calendar"
                defaultDate={defaultDate}
                date={date}
                DayComponent={DayComponent}
                onSelect={(selectedDate) => {
                onSelect(selectedDate);
                this.refs.calendar.resetStartFromDate(selectedDate);
            }}
                headerFormat={headerFormat}
                footerFormat={footerFormat}
                timezone={timezone}
                dayProps={dayProps}
            />
        </div>;

        return (
            <div>
                {inline ? datepicker : (
                    <Popover
                        isOpen={isOpen}
                        body={datepicker}
                        onOuterAction={this.hide}
                        preferPlace={preferPlace}
                        {...otherPopoverProps}
                        refreshIntervalMs={0}
                    >
                        {children ? (
                            <span
                                onClick={this.show}>
                                {children}
                            </span>
                        ) : (
                            <input
                                onFocus={this.show}
                                onClick={this.show}
                                value={date && date.format('YYYY-MM-DD')}
                                onChange={({target:{value}}) => {
                                    const selectedDate = moment.tz(value, timezone);
                                    onSelect(selectedDate);
                                    this.refs.calendar.resetStartFromDate(selectedDate);
                                }}
                                type="date"
                            />
                        )}
                    </Popover>
                )}
            </div>
        );

    }

}

export default DatePicker;
