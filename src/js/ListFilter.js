import React, { Component } from 'react';
import { database } from '../firebase/firebase';

class ListFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            studentList: [],
            filteredList: []
        }
    }
    componentWillMount() {
        database.ref().once('value')
            .then((snapshot) => {
                const values = Object.values(snapshot.val());
                this.setState(() => ({ studentList: values }));
            })
    }
    handleChange = (event) => {
        const searchString = event.target.value;
        this.setState(() => ({ value: searchString }));
        const filteredList = this.state.studentList.filter((index) => {
            return index.regdNo.includes(searchString)
        })
        this.setState(() => ({ filteredList }));
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                {
                    this.state.filteredList.map((value, i) => {
                        return (
                            <div key={i}>
                                Regd No: {value.regdNo} <br />
                                Name: {value.name} <br />
                                Company: {value.company} <br />
                                Dues : {value.dues} <br />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ListFilters;
