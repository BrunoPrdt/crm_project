import React from 'react';

/**
 *
 * @param {string} name
 * @param {string} label
 * @param value
 * @param {string} error
 * @param {function} onChange
 * @param {frameElement}children
 * @returns {*}
 * @constructor
 */
const Select = ({name, label, value, error ="", onChange, children}) => {
    return (
        <div className="form-groups">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} className={"form-control" + (error && " is-invalid")} onChange={onChange} value={value}>
                {children}
            </select>
            <p className="invalid-feedback">{error}</p>
        </div>
    );
};

export default Select;