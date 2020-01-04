import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1 className="display-3">Welcome Back <small>{this.props.email}</small></h1>
                <div className={"container"}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto atque cumque, earum enim est
                        eveniet, incidunt laudantium libero odit porro quidem quisquam reiciendis rem, sequi sint? Culpa
                        iure nulla tempore.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut, dicta dolore error,
                        esse et ex excepturi ipsa molestias optio provident quam quas, quod quos sint suscipit vel vitae
                        voluptates.</p>
                </div>
            </div>
        )
    }
}

export default Home;