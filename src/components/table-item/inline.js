import React, { Component } from 'react';

export default class Inline extends Component {

    state =  {
        edit: false,
        companyAddress: this.props.companyAddress
    }

    onEdit = () => {
        this.setState({
            edit: !this.state.edit
        });
    };

    handleChange = (event) => {
        this.setState({
            companyAddress: event.target.value
        });
    };

    onBlur = () => {
        this.setState({
            companyAddress: this.props.companyAddress,
            edit: false
        });
    };

    onKeyDown = (event) => {
        
        if(event.key === 'Enter') {
            const { itemEdit } = this.props;
            itemEdit(this.props.id, this.state.companyAddress);
            this.setState({
                edit: false
            });
        };

        if(event.key === 'Escape') this.onBlur();
    };

    render() {
        const { edit, companyAddress } = this.state;

        if(edit) {
            return (
                <td>
                    <form>
                        <input autoFocus 
                            className="form-control" 
                            type="text"
                            value={companyAddress}
                            onChange={this.handleChange}
                            onBlur={this.onBlur}
                            onKeyDown={this.onKeyDown}
                            ></input>
                    </form>
                </td>
            );
        };
        return (
            <td onClick={this.onEdit}>
                {companyAddress}
            </td>
        )
    };
}