import React from 'react';

/**
 *
 * @param {string} name
 * @param {string} label
 * @param {string} type
 * @param {string} value
 * @param {string} placeholder
 * @param {function} onChange
 * @param {string} error
 * @returns {*}
 * @constructor
 */
const Field = ({name, label, type, value, placeholder, onChange, error = ""}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                name={name}
                id={name}
                onChange={onChange}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default Field;