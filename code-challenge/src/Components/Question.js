import React, { Component } from "react";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://immense-citadel-86220.herokuapp.com/")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error && items) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      let item = items;
      return (
        <div>
          <h1>{item[0].question}</h1>
          <input type="text" value="Answer Here!" />
          <h2>Hint:</h2>
          <p>{item[0].hint}</p>
          <h2>Answer:</h2>
          <p>{item[0].answer}</p>
          <h2>Learn More!</h2>
          <a href={item[0].url}>{item[0].url}</a>
        </div>
      );
    }
  }
}

export default Question;
