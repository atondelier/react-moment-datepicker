"use strict";

import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import 'moment-timezone';
import React from 'react';
import Popover from 'react-popover';
import Calendar from './Calendar.jsx';

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
        popoverOptions: React.PropTypes.object
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
            popoverOptions
        } = this.props;

        const {
            preferPlace = 'below',
            ...otherPopoverOptions
        } = popoverOptions || {};

        const {
            isOpen
        } = this.state;

        const calendar = <Calendar
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
        />;

        return (
            <div>
                {inline ? calendar : (
                    <Popover
                        isOpen={isOpen}
                        body={calendar}
                        onOuterAction={this.hide}
                        preferPlace={preferPlace}
                        {...otherPopoverOptions}
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
