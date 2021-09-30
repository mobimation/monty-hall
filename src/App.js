import React, { Component } from 'react';
import './App.css';

/***
  Monty Hall simulator for Tele2.
  See document "Com Hem Group CRM - Tekniskt Prov".
  Gunnar Forsgren 2021-09-29
*/
import bg from './images/deal.jpg';  // Background image

class App extends Component {

  constructor(props) {
    super(props);
    this.state  = {
      isChecked: props.isChecked || false,
      apiResponse: ""
    };
    this.probability="";
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ isChecked: !this.state.isChecked })
  }
  // Submit simulation request to backend, three parameters
  // number of doors (number)
  // change doors (boolean)
  // iterations (number)
  handleSubmit = (event) => {
    event.preventDefault();

    const encodeGetParams = p =>
      Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

    // Parameters of simulation service
    const params = {
      ndoors: 3, // Number of doors of Monty Hall door simulation
      change: this.state.isChecked, // true = Player want to change doors
      iterations: event.target.iterations.value // Number of simulations
    };

/*    // Test for API availability
      let url = "http://localhost:9000/testapi"

      // Retrieve result data, setState triggers rendering
      fetch(url)
        .then(response => response.text())
        .then(result => this.setState({ apiResponse: result }));
        .then if (result != "API is working properly.") {
*/
          // Send simulation request to backend service
          let url = "http://localhost:9000/simulate?" + encodeGetParams(params)

          // Retrieve result data, setState triggers rendering
          fetch(url)
            .then(response => response.text())
            .then(result => this.setState({ apiResponse: result }));          
  }

// Calculations when new simulation data arrives
componentDidUpdate(prevProps, prevState) {
  let res=JSON.parse(this.state.apiResponse);
  let percent=res.percentage;
  this.probability=parseFloat(percent.successProbability.toFixed(2));
}
  // Rendering - see App.css for UI element positioning amd style
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <img style={{backgroundImage: bg,
         backgroundPosition: 'center',
         backgroundSize: 'cover',
         backgroundRepeat: 'no-repeat' }}
        alt="bg" src={bg} />
        <h3 className="result-row-1">Sannolikhet</h3>
        <h3 className="result-row-2">{this.probability} %</h3>

      <h2 className="mh-header">Monty Hall Simulering</h2>
      <label className="itlabel">Iterationer:</label>
      <input className="iter" name="iterations"/>
      <label className="door-label">Byt dörr:</label>
      <label className="box">
        <input type="checkbox" value={this.state.isChecked} onChange={this.handleChange} />
      </label>

      <button type="submit" className="button-style">Kör simulering</button>
    </form>
    );
  }
}
export default App;
