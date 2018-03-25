import React, { Component } from 'react';

import { database } from '../firebase/firebase';

import { List, Grid, Card, Feed, Button } from 'semantic-ui-react';

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
                <Button inverted color='green' content="View All" onClick={this.viewAll} fluid></Button>
                <br /><br />
                <div className="row">
                    {
                        this.state.studentList.sort().map((student, i) => (
                            <div className="col-md-4" key={i}>
                                <Card>
                                    <Card.Content>
                                        <Feed>
                                            <Feed.Event>
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        Registration Number : {student.regdNo}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                            <hr />
                                            <Feed.Event>
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        Student Name : {student.name}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                            <Feed.Event>
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        Company : {student.company}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                            <Feed.Event>
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        Dues : {student.dues}
                                                    </Feed.Summary>
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                    </Card.Content>
                                </Card>
                                <br />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default ListAll;