# react-moment-datepicker

React datepicker bound to moment for the locale data and timezones handling

## How to

### Install

`npm i react-moment-datepicker`

### Peer dependencies

```JSON
{
    "classnames": "2.2.5",
    "moment": "2.14.1",
    "moment-timezone": "0.5.5",
    "react": "15.3.1",
    "react-addons-css-transition-group": "15.3.1",
    "react-popover": "0.4.4"
}
```

### Example

#### Import JavaScript

```JS
import MomentDatepicker from 'react-moment-datepicker';
```

#### Import styles

```SCSS
@import "../../node_modules/react-moment-datepicker/lib/react-moment-datepicker";
```

#### Create

##### Default

A default date input will be created. The date picker will open when focusing on it.

```JS
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
```

##### With children

The date picker will open when clicking on the children.

```JS
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
```

##### Inline

The date picker is inline. No popover behavior.

```JS
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
```

### API

#### `DatePicker.propTypes`

```JS
{
    // which month when no date
    defaultDate: momentPropTypes.momentObj,

    // current value
    date: momentPropTypes.momentObj,

    // current timezone if not the moment default one
    timezone: React.PropTypes.string,

    // overridable component for day cells
    DayComponent: React.PropTypes.func,

    // format for the date in the header (basically month and year)
    headerFormat: React.PropTypes.string,

    // format for the default date in the footer
    footerFormat: React.PropTypes.string,

    // calendar wrapped in a popover by default, inlined if inline prop is true
    inline: React.PropTypes.bool,

    // props passed to the popover component
    popoverProps: React.PropTypes.object,

    // selection handler (basically update the date then provided as prop)
    onSelect: React.PropTypes.func

    // navigation handler
    onNavigate: React.PropTypes.func,

    // modifier to be concatenated with "rm_datepicker" as a classname
    classNameModifier: React.PropTypes.string
}
```

#### Component's exposed methods

To access components exposed methods, refer to the [Expose Component Functions](https://facebook.github.io/react/tips/expose-component-functions.html) from the official documentation.

```JS
// show the datepicker
this.refs.datepicker.show();

// hide the datepicker
this.refs.datepicker.hide();
```

#### Limitations

 * Only supports month view. The code is nearly ready to make "month" unit a prop.

## Contribute

### Start

```
git clone git@github.com:atondelier/react-moment-datepicker.git
cd react-moment-datepicker
npm install
npm start
```

Go to `localhost:8080`

### Build

`npm run build`

## Credits

Written for [lafourchette](https://github.com/lafourchette) organization.
