import React, {Component} from 'react';

import TableList from '../table-list';
import ModalView from '../modal-view';

import './app.css';

export default class App extends Component {

    newId = 0;

    createCompanyItem = (companyName, companyAddress, 
        ogrn, inn, registrationDate) => {
                return {
                    companyName,
                    companyAddress,
                    ogrn,
                    inn,
                    registrationDate: new Date(registrationDate).toLocaleDateString(),
                    id: this.newId++
                }
            };

    state = {
        companyList: [
            this.createCompanyItem('Example company', 'Example address', '1026600727020', '6606015817', '04.10.2002'),
            this.createCompanyItem('АО "КОРПОРАЦИЯ "АТОМСТРОЙКОМПЛЕКС"', 'г Екатеринбург, ул Белинского, д 39', '1056604409784', '6672184222', '03.30.2005'),
        ],
        modalVisible: false
    };
    

    onItemEdit = (id, value) => {
        this.setState(({companyList}) => {
            const indx = companyList.findIndex((item) => item.id === id );
            let item = companyList[indx];
            item.companyAddress = value;

            const newList =  [...companyList.slice(0, indx), item, ...companyList.slice(indx + 1)];
            return {
                companyList: newList
            };
        });
    };

    deleteItem = (id) => {
        this.setState(({companyList}) => {
            const indx = companyList.findIndex((item) => item.id === id );

            const newList = [...companyList.slice(0, indx), ...companyList.slice(indx + 1)];

            return {
                companyList: newList
            };
        });
    };

    modalToggle = () => {
        this.setState(({modalVisible}) => {
            return {
                modalVisible: !modalVisible
            };
        });
    };

    itemAdd = ({companyName, companyAddress, 
        ogrn, inn, registrationDate}) => {
            const newItem = this.createCompanyItem(companyName, companyAddress, 
                ogrn, inn, registrationDate);  
                
            this.setState(({companyList}) => {
                const newList = [...companyList, newItem];
                return {
                    companyList: newList
                };
            });
    };

    
    render() {
        const {companyList, modalVisible} = this.state;

        return (
            <div className="app container">
                <h2>Список компаний</h2>
                <ModalView modalVisible={modalVisible} 
                    itemAdd={this.itemAdd}
                    modalToggle={this.modalToggle}/>
                <button type="button"
                    className="btn btn-outline-secondary float-right"
                    onClick={() => this.modalToggle()}
                    >Добавить</button>
                <div className="company-list">
                    <TableList 
                        itemEdit={(id, value) => this.onItemEdit(id,value)}
                        companyList={companyList}
                        onDeleted={(id) => this.deleteItem(id)} />
                </div>
            </div>
        );
    };

};