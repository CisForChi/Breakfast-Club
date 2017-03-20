import React from 'react';
import ReactDOM from 'react-dom';
import Search from 'react-search'

 
const resultRecipes = React.createClass({
    onToggle: function() {
        this.props.onToggle(this.props.id, !this.props.selected);
    },

    render: function() {
        return <button onClick={this.onToggle}>Toggle {this.props.label} - {this.props.selected ? 'Selected!' : ''}!</button>;
    }
});