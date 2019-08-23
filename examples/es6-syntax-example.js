import {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    console.log('Invoked Before Render()');
  }
  render() {
    return <h1> Hello World </h1>;
  }
  componentDidMount() {
    console.log('Invoked After Render()');
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
