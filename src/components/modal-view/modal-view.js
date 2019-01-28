import React, { Component } from 'react';

import DadataService from '../../services/dadata-service/dadata-service';
import './modal-view.css';

export default class ModalView extends Component {
    
    state = {
        companyName: '',
        companyAddress: '',
        ogrn: '',
        inn: '',
        registrationDate: '',
        danger: false
    };

    onClose = () => {
        const {modalToggle} = this.props;

        this.setState({
            companyName: '',
            companyAddress: '',
            ogrn: '',
            inn: '',
            registrationDate: ''
        });

        modalToggle();
    };

    handleChange = (event) => {
        this.formValidation(event);

        this.setState({
            [event.target.name] : event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { itemAdd } = this.props;
        itemAdd(this.state);

        this.onClose();
    };
    
    modalAboard = (event) => {
        if(event.target.className === 'modal') this.onClose(); 
    };

    addData = () => {
        let {inn} = this.state;
        if(inn.length >=10) {
            let dadataService = new DadataService();
            let item = dadataService.getCompany(inn.trim());
            if(item === undefined) {
                this.setState({companyName: 'Нет такой компании'});
                return null;
            }
            this.setState({
                companyName: item.value,
                companyAddress: item.data.address.value,
                ogrn: item.data.ogrn,
                registrationDate: item.data.state.registration_date,
                danger: false
            })
        };
    }

    formValidation = (event) => {
        switch (event.target.name) {
            case 'ogrn' : 
                event.target.value.length === 12 ? event.target.classList.remove('danger') : event.target.classList.add('danger');
                this.setState({danger: true});
                break;
            case 'inn' :
                event.target.value.length >= 10 || event.target.value.length <= 12  ? event.target.classList.remove('danger') : event.target.classList.add('danger');
                this.setState({danger: true});
                break;
            default: 
                event.target.value.length > 3 ? event.target.classList.remove('danger') : event.target.classList.add('danger');
                this.setState({danger: true});
                break;
        };

        if(!document.getElementsByClassName('danger').length) {
            this.setState({danger: false});
        };
    };

    render() {
        const { modalVisible } = this.props;
        const { companyName, companyAddress, ogrn, inn, registrationDate, danger } = this.state;
        let disabled;

        if((!companyName || !companyAddress 
            || !ogrn || !inn || !registrationDate) || danger) disabled = true;

        if(!modalVisible) return null;
        return (
            <div onClick={this.modalAboard} className="modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Добавить компанию</h5>
                            <button type="button"
                                className="close"
                                onClick={this.onClose}
                                >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                            <form onSubmit={this.handleSubmit}>
                                <label className="col">Наименование
                                    <input type="text"
                                        className="form-control" 
                                        value={companyName} 
                                        onChange={this.handleChange} 
                                        name="companyName"/>
                                </label>
                                <label className="col">Адрес
                                    <input type="text"
                                        className="form-control" 
                                        value={companyAddress} 
                                        onChange={this.handleChange} 
                                        name="companyAddress"/>
                                </label>
                                <label className="col">ОГРН
                                    <input type="text"
                                        className="form-control" 
                                        value={ogrn} 
                                        onChange={this.handleChange}
                                        maxLength="12" 
                                        name="ogrn" />
                                </label>
                                <div className="col">
                                    <label>ИНН
                                        <input type="text"
                                            className="form-control" 
                                            value={inn} 
                                            onChange={this.handleChange} 
                                            name="inn"
                                            maxLength="11"/>
                                    </label>
                                    <button type="button"
                                            className="btn btn-outline-success
                                                    add float-right"
                                            onClick={this.addData}
                                        >Загрузить данные по ИНН
                                    </button>
                                </div>
                                <div className="col">
                                <label>Дата регистрации
                                    <input type="date"
                                        className="form-control" 
                                        value={registrationDate} 
                                        onChange={this.handleChange} 
                                        name="registrationDate"/>
                                </label>
                                <button className="btn btn-outline-dark 
                                                add float-right"
                                    disabled={disabled} 
                                    onSubmit={this.handleSubmit}> 
                                    Добавить
                                </button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

