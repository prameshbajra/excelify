import React, { Component } from 'react';
import { database } from '../firebase/firebase';

import { Card, Feed, Input } from 'semantic-ui-react';

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
                if (snapshot.val()) {
                    const values = Object.values(snapshot.val());
                    this.setState(() => ({ studentList: values }));
                }
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
                {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                <Input
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder='Search...' fluid
                    type="text" value={this.state.value} onChange={this.handleChange}
                />
                <br /><br />
                <div className="row">
                    {
                        this.state.filteredList.map((value, i) => {
                            return (
                                <div className="col-md-4" key={i}>
                                    <Card>
                                        <Card.Content>
                                            <Feed>
                                                <Feed.Event>
                                                    <Feed.Content>
                                                        <Feed.Summary>
                                                            Registration Number : {value.regdNo}
                                                        </Feed.Summary>
                                                    </Feed.Content>
                                                </Feed.Event>
                                                <hr />
                                                <Feed.Event>
                                                    <Feed.Content>
                                                        <Feed.Summary>
                                                            Student Name : {value.name}
                                                        </Feed.Summary>
                                                    </Feed.Content>
                                                </Feed.Event>
                                                <Feed.Event>
                                                    <Feed.Content>
                                                        <Feed.Summary>
                                                            Company : {value.company}
                                                        </Feed.Summary>
                                                    </Feed.Content>
                                                </Feed.Event>
                                                <Feed.Event>
                                                    <Feed.Content>
                                                        <Feed.Summary>
                                                            Dues : {value.dues}
                                                        </Feed.Summary>
                                                    </Feed.Content>
                                                </Feed.Event>
                                            </Feed>
                                        </Card.Content>
                                    </Card>
                                    <br />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

export default ListFilters;
