import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'

export default class Example extends Component {
    constructor(props){
        super(props)
        this.state = {
            money: 0.0,
            transfers: [],
            error: null,
            form: {
                description: '',
                amount: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e){
        e.preventDefault()
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch('https://walletlaravel.herokuapp.com/api/transfer', config)
            let data = await res.json()
            
            this.setState({
                transfers: this.state.transfers.concat(data),
                money: this.state.money + ( parseInt(data.amount))
            })
        } catch (error) {
            console.log(error)
        }
    }
    handleChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    async componentDidMount(){
        try {
            let res = await fetch('https://walletlaravel.herokuapp.com/api/wallet')
            let data = await res.json()

            this.setState({
                money: data.money,
                transfers: data.transfers
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 m-t-md">
                        <p className={this.state.money < 0 ? 'title text-danger' : 'title'}> $ {this.state.money} </p>
                    </div>
                    <div className="col-md-12">
                        <TransactionForm 
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit}
                            form={this.state.form}
                        />
                    </div>
                </div>
                <div className="m-t-md">
                    <TransactionList 
                        transfers={this.state.transfers}
                    />
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
