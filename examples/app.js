"use strict";

import moment from 'moment';
import 'moment-timezone';
import React, {Component} from 'react';
import {render} from 'react-dom';
import DatePicker from '../src/DatePicker.js';
import Day from '../src/Day.js';
import './app.css';

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
            date
        } = this.state;

        const now = moment().startOf('day');

        return (
            <div>
                <div>
                    <label>set moment locale:
                        <select value={this.state.locale} onChange={({target:{value}}) => this.setState({locale: value})}>
                            <option value="fr">fr</option>
                            <option value="en">en</option>
                        </select> -> {moment.locale()}
                    </label>
                </div>
                <div>
                    <label>set moment timezone:
                        <select value={this.state.timezone} onChange={({target:{value}}) => this.setState({timezone: value})}>
                            <option value="Europe/Paris">Europe/Paris</option>
                            <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                        </select> -> {moment.defaultZone && moment.defaultZone.name}
                    </label>
                </div>
                <div style={{'height': 400}}>
                    <h2>inline</h2>
                    <DatePicker
                        inline
                        timezone={this.state.timezone}
                        date={date}
                        defaultDate={now}
                        DayComponent={Day}
                        headerFormat={'MMMM YYYY'}
                        footerFormat={'LL'}
                        onSelect={(selectedDate) => {
                          this.setState({
                            date: selectedDate
                          });
                        }}
                    />
                </div>
                <div style={{'height': 400}}>
                    <h2>editable from an element</h2>
                    <DatePicker
                        timezone={this.state.timezone}
                        date={date}
                        defaultDate={now}
                        DayComponent={Day}
                        headerFormat={'MMMM YYYY'}
                        footerFormat={'LL'}
                        onSelect={(selectedDate) => {
                        this.setState({
                            date: selectedDate
                        });
                    }}
                    >edit the date: {date ? date.format('LLLL') : 'n/a'} (utc: {date ? date.clone().utc().format('LLLL') : 'n/a'})</DatePicker>
                </div>
                <div style={{'height': 400}}>
                    <h2>editable from an input by default</h2>
                    <DatePicker
                        timezone={this.state.timezone}
                        date={date}
                        defaultDate={now}
                        DayComponent={Day}
                        headerFormat={'MMMM YYYY'}
                        footerFormat={'LL'}
                        onSelect={(selectedDate) => {
                        this.setState({
                            date: selectedDate
                        });
                    }}
                    />
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('calendarContainer'));
