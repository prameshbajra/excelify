import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import ListFilter from './ListFilter';
import ListAll from './ListAll';
import { database } from '../firebase/firebase';

import { Container, Label } from 'semantic-ui-react';

class App extends Component {
    realParser = (result) => {
        const finalResult = result.map((value) => {
            if (value[0] && value[0].length === 10) {
                return {
                    regdNo: value[0],
                    name: value[1] ? value[1].toUpperCase() : "Not Available",
                    dues: value[2] ? value[2] : "Not Available",
                    company: value[3] ? value[3] : "Not Available"
                }
            }
            return {};
        });
        const arrayToObject = (finalResult) =>
            finalResult.reduce((obj, item) => {
                obj[item.regdNo] = item
                return obj;
            }, {});
        const firebaseSchemaObject = arrayToObject(finalResult);
        database.ref().set(firebaseSchemaObject);
    }
    fileName = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            this.realParser(data);
        };
        reader.readAsBinaryString(file);
    }
    render() {
        return (
            <Container>
                <br /><br /><br />
                <div>
                    <label htmlFor="file" className="ui inverted green button fluid">
                        <i className="file icon"></i>
                        Let's choose a file to upload</label>
                    <input type="file" onChange={this.fileName} id="file" style={{ display: "none" }} />
                </div>
                <br /> <br />
                <ListFilter />
                <ListAll />
                <Label as='a' style={{
                    position: "absolute", bottom: "10px"
                }} basic color='red' pointing>
                    The app currently only works with certain structured excel files. This will be changed later. The search is done in reference to registration number. The app will only take time to load for the first time.
                        </Label>
            </Container>
        );
    }
}

export default App;
