import React from 'react';

const Field = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                name={props.name}
                id={props.name}
                onChange={props.onChange}
                className={"form-control" + (error && " is-invalid")}
            />
            {error && <p className="invalid-feedback">{error}</p>}
        </div>
    );
};

export default Field;