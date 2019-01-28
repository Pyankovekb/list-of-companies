import React from 'react';

import TableItem from '../table-item';

const TableList = ({companyList, onDeleted, itemEdit}) => {
    const items = companyList.map((item, indx) => {
        const { id, ...itemProps} = item;

        return (
            <tr key={id}>
                <TableItem {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    indx={indx}
                    id={id}
                    itemEdit={itemEdit}
                />
            </tr>
        );
    });

    return (
        <table className="table table-hover">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Адрес</th>
                    <th scope="col">ОГРН</th>
                    <th scope="col">ИНН</th>
                    <th scope="col">Дата регистрации</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { items }
            </tbody>
        </table>
    );
};

export default TableList;