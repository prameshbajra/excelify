import React, { Component } from 'react';

import { database } from '../firebase/firebase';

class ListAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: []
        }
    }
    viewAll = () => {
        this.setState(() => ({ studentList: [] }))
        database.ref().once('value').then((snapshot) => {
            const redgArr = [];
            const receivedObj = snapshot.val();
            for (let regdNo in receivedObj) {
                redgArr.push(regdNo);
            }
            redgArr.map((regdNo) => {
                return this.setState(() => ({ studentList: [...this.state.studentList, receivedObj[regdNo]] }));
            })
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.viewAll}>View All</button>
                {
                    this.state.studentList.sort().map((student, i) => (
                        <div key={i}>
                            Name: {student.name}
                            <br />
                            Regd No : {student.regdNo}
                            <br />
                            Dues : {student.dues}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ListAll;