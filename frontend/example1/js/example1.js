
/*
class App extends React.Component {

  render() {

    var quiz = [123, 121];

      return (
        <div>
          <h2>Travel Destination Title</h2>
          <div>Travel Destination Description goes here</div>
          <div className="messages" id="messages"></div>
        </div>
      );
  }

}

// rendering into the DOM
ReactDOM.render(
  <App/>, 
  document.getElementById('app')
);
*/

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      items: [],
      error: [],
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  updateStep() {
    this.setState(
      state => ({
        step: state.step + 1
      })
    );
  }

  componentDidMount() {
    //this.step = setInterval(() => this.updateStep(), 1000 );
  }*/

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.text.length) {
      console.log("ERROR");
      return;
    }

    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  render() {
    return (
      <div>
        <div>hola {this.props.name}</div>
        <h3>Nombres</h3>
        <ListItem items={this.state.items} />

        <form onSubmit = {this.handleSubmit}>
          <label>Form example 1</label>
          <input id="name" onChange={this.handleChange} value={this.state.text} />
          <button> Añadir #{this.state.items.length + 1} </button>
        </form>

      </div>
    );
  }
}

class ListItem extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
  <Message name="Jose"/>, 
  document.getElementById('app')
);

/*
 *
var message = <h1>Hello Jose</h1>;

// rendering into the DOM
ReactDOM.render(
  message, 
  document.getElementById('app')
);
*/
