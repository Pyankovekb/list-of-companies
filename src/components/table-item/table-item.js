import React, {Component, Fragment} from 'react';

import Inline from './inline';

export default class TableItem extends Component {
    state = {
        inn: this.props.inn
    };

    render() {
        const { id, companyName, companyAddress, 
            ogrn, inn, registrationDate, onDeleted,
                itemEdit, indx } = this.props;
                
        return (
            <Fragment>
                <th scope="row">{indx+1}</th>
                <td>{companyName}</td>
                <Inline id={id} companyAddress={companyAddress} 
                        itemEdit={itemEdit}/>
                <td>{ogrn}</td>
                <td >{inn}</td>
                <td>{registrationDate}</td>
                <td>
                    <button type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDeleted}>
                    Удалить
                    </button>
                </td>
            </Fragment>
        );
    };
};