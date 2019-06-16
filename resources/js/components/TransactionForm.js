import React, { Component } from 'react'

const TransactionForm = ({ onChange, onSubmit, form}) => (
    <form 
        className="form-inline justify-content-center"
        onSubmit={onSubmit}
    >
    <div className="form-group mb-2">
        <input 
            type="text"
            className="form-control"
            placeholder="Description"
            name="description"
            onChange={onChange}
            value={form.description}
        />
    </div>
    <div className="input-group mx-sm-2 mb-2">
        <div className="input-group-prepend">
            <div className="input-group-text">$</div>
        </div>
        <input 
            type="text"
            className="form-control" 
            name="amount"
            onChange={onChange}
            value={form.amount}
        />
    </div>
    <button 
        type="submit"
        className="btn btn-primary mb-2"
    >
        Add
    </button>
</form>
)
export default TransactionForm