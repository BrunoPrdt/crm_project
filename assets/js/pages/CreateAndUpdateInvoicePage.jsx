import React, {useState} from 'react';
import PropTypes from 'prop-types';

const CreateAndUpdateInvoicePage = ({history, match}) => {

    const [invoice, setInvoice] = useState({});
    const [editing, setEditing] = useState(false);
    const id = match.params.id;

    return (
        <>
            <h1>Création d'une facture</h1>
        </>
    );
};

CreateAndUpdateInvoicePage.propTypes = {

};

export default CreateAndUpdateInvoicePage;