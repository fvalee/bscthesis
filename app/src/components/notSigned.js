import React from 'react'
import '../forms/Form.css'

class Index extends React.Component {
    render() {
        return(
            <div className="container" id="container">
                <div className="jumbotron" style={{textAlign: "center"}}>
                    <h6 className="display-4">Web aplikacija za glazbena djela</h6>
                </div>
            </div>
        );
    }
}

export default Index;