"use strict";

import moment from 'moment';
import 'moment-timezone';
import React, {Component} from 'react';
import {render} from 'react-dom';
import DatePicker from '../src/DatePicker.js';
import Day from '../src/Day.js';
import './app.css';

const DefaultDatePicker = ({
    date,
    timezone,
    onSelect
}) => (
    <DatePicker
        timezone={timezone}
        date={date}
        defaultDate={moment().startOf('day')}
        DayComponent={Day}
        headerFormat={'MMMM YYYY'}
        footerFormat={'LL'}
        onSelect={onSelect}
    />
);

const InlineDatePicker = ({
    date,
    timezone,
    onSelect
}) => (
    <DatePicker
        inline
        timezone={timezone}
        date={date}
        defaultDate={moment().startOf('day')}
        DayComponent={Day}
        headerFormat={'MMMM YYYY'}
        footerFormat={'LL'}
        onSelect={onSelect}
    />
);

const ElementDatePicker = ({
    date,
    timezone,
    onSelect,
    children
}) => (
    <DatePicker
        timezone={timezone}
        date={date}
        defaultDate={moment().startOf('day')}
        DayComponent={Day}
        headerFormat={'MMMM YYYY'}
        footerFormat={'LL'}
        onSelect={onSelect}
    >
        {children}
    </DatePicker>
);

class App extends Component {

    state = {
        date: null,
        locale: 'fr',
        timezone: 'America/Sao_Paulo'
    };

    componentWillMount() {
        moment.locale(this.state.locale);
        moment.tz.setDefault(this.state.timezone);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.locale !== this.state.locale) {
            moment.locale(nextState.locale);
        }
        if (nextState.timezone !== this.state.timezone) {
            moment.tz.setDefault(nextState.timezone);
        }
    }

    render() {

        const {
            date,
            locale,
            timezone
        } = this.state;

        return (
            <div>
                <div>
                    <label>set moment locale:
                        <select value={locale} onChange={({target:{value}}) => this.setState({locale: value})}>
                            <option value="fr">fr</option>
                            <option value="en">en</option>
                        </select> -> {moment.locale()}
                    </label>
                </div>
                <div>
                    <label>set moment timezone:
                        <select value={timezone} onChange={({target:{value}}) => this.setState({timezone: value})}>
                            <option value="Europe/Paris">Europe/Paris</option>
                            <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                        </select> -> {moment.defaultZone && moment.defaultZone.name}
                    </label>
                </div>
                <div style={{'height': 400}}>
                    <h2>inline</h2>
                    <InlineDatePicker
                        timezone={timezone}
                        date={date}
                        onSelect={(date) => this.setState({date})}
                    />
                </div>
                <div style={{'height': 400}}>
                    <h2>editable from an element</h2>
                    <ElementDatePicker
                        timezone={timezone}
                        date={date}
                        onSelect={(date) => this.setState({date})}
                    >
                        edit the date: {date ? date.format('LLLL') : 'n/a'} (utc: {date ? date.clone().utc().format('LLLL') : 'n/a'})
                    </ElementDatePicker>
                </div>
                <div style={{'height': 400}}>
                    <h2>editable from an input by default</h2>
                    <DefaultDatePicker
                        timezone={timezone}
                        date={date}
                        onSelect={(date) => this.setState({date})}
                    />
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('calendarContainer'));
