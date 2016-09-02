"use strict";

import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import React from 'react';
import classnames from 'classnames';
import './Month.css';

const Month = ({
    displayedStartDate,
    date,
    defaultDate,
    DayComponent = require('./Day.jsx'),
    dayProps,
    onSelect,
    timezone
}) => {

    const firstDayOfWeek = moment.localeData().firstDayOfWeek();
    const startOfMonth = displayedStartDate;
    const firstDayOfMonth = startOfMonth.day();
    const firstDisplayedDate = startOfMonth.clone().subtract((firstDayOfMonth - firstDayOfWeek + 7) % 7, 'days');
    const groupedDates = [];

    let cursor = firstDisplayedDate.clone();

    while (true) {
        let line;
        groupedDates.push(line = []);
        for (let i = 0; i < 7; i++) {
            line.push(cursor);
            cursor = cursor.clone().add(1, 'day').add(1, 'hour').startOf('day');
        }
        if (cursor.diff(displayedStartDate, 'month') > 0) {
            break;
        }
    }

    const dateDayStart = date && date.clone().startOf('day');
    const defaultDateDayStart = (defaultDate.clone() || moment().tz(timezone)).startOf('day');
    const weekdaysShort = moment.localeData()._weekdaysShort;

    return (
        <div>
            <table className="calendarMonth">
                <thead>
                <tr>
                    {weekdaysShort
                        .slice(firstDayOfWeek)
                        .concat(weekdaysShort.slice(0, firstDayOfWeek))
                        .map((weekday, columnIndex) => <th key={columnIndex} className="calendarMonth-weekdayHead">{weekday}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {groupedDates.map((line, rowIndex) => (
                    <tr key={rowIndex}>
                        {line.map((cellDate, columnIndex) => {
                            const isSelected = !!date && Math.abs(cellDate.diff(dateDayStart, 'hours')) < 12;
                            const isDefault = Math.abs(cellDate.diff(defaultDateDayStart, 'hours')) < 12;
                            return (
                                <td key={rowIndex * 7 + columnIndex}
                                    className={classnames('calendarMonth-cell', {
                                      'calendarMonth-cell--selected': isSelected,
                                      'calendarMonth-cell--default': isDefault
                                    })}
                                    >
                                    <DayComponent
                                        date={cellDate}
                                        displayedStartDate={displayedStartDate}
                                        isSelected={isSelected}
                                        isDefault={isDefault}
                                        onClick={() => onSelect(cellDate.clone())}
                                        timezone={timezone}
                                        {...dayProps}
                                    />
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

Month.propTypes = {
    displayedStartDate: momentPropTypes.momentObj,
    date: momentPropTypes.momentObj,
    defaultDate: momentPropTypes.momentObj,
    DayComponent: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    dayProps: React.PropTypes.object,
    timezone: React.PropTypes.string
};

export default Month;
