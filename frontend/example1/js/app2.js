    var questions = [];


class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nids: [12, 43, 124, 122],
    };
  }



  render() {
   var nids = this.state.nids;

    return (
      <div>
        <BuildForm ids={nids} />
      </div>
    );
  }
}

class BuildForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      step: []
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //incrementar step
  }


  updateQuestion() {
    questions[12] = {
      nid: 12,
      title: 'quiz 2',
      question: [
        {
          text : 'pregunta numero 1',
          answers: [
            {
              title: 'pregunta numero 1',
              iscorrect: false,
            },
            {
              title: 'pregunta numero 2',
              iscorrect: false,
            },
            {
              title: 'pregunta numero 3',
              iscorrect: false,
            },
          ]
        }
      ],
    };

    questions[43] = {
      nid: 43,
      title: 'quiz 1',
      question: [
        {
          text : 'pregunta numero 1',
          answers: [
            {
              title: 'pregunta numero 1',
              iscorrect: false,
            },
            {
              title: 'pregunta numero 2',
              iscorrect: false,
            },
            {
              title: 'pregunta numero 3',
              iscorrect: false,
            },
          ]
        },
        {
          text : 'pregunta numero 2',
          answers: [
            {
              title: 'pregunta numero 4',
              iscorrect: false,
            },
            {
              title: 'pregunta numero 5',
              iscorrect: false,
            },
            {
              title: 'pregunta numero 6',
              iscorrect: false,
            },
          ]
        }
      ]
    };
  }

  render() {
    this.updateQuestion();

    let itemList = this.props.ids.map((item) => {
      if (questions[item] && questions[item].question.length) {
        return (
          <li key={item}>
            <ItemForm nid={item}/>
          </li>
        );
      }
    });

    return (
      <ul className="ul">
        {itemList}
      </ul>
    );
  }
}

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      step: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var element = questions[this.props.nid];
    var question = element.question[this.state.step];

    //obtener los valores
    //console.log(e.target[1].value);

    //incrementar step
      this.setState(state => ({
        step: state.step + 1,
        data: {}
      }));

  }

  render() {
    var element = questions[this.props.nid];

    if ((this.state.step + 1) <= element.question.length) {
      var question = element.question[this.state.step];

      var answers = question.answers.map((value, key) => {
        return (
          <div>
            <Checkbox label={value.title} id={key} nid={this.props.nid} paso={this.state.step}/>
          </div>
        );
      });
    }



    return (
      <div>
      {this.state.step  < element.question.length ? (
      <form onSubmit = {this.handleSubmit} key={this.props.nid}>
        <h3>Formulario #{element.title}</h3>
        <div><h4>{question.text}</h4></div>
        <div>{answers}</div>

        <div className="actions submit-form">
          <button className="previus" type="submit" onClick={this.previousStep}> Regresar </button>
          <button className="continue" type="submit"> Continuar </button>
        </div>
      </form>
      ) : (
          <div>
            <h3>Formulario #{element.title}</h3>
            <div>completado</div>
          </div>
        )}
      </div>
    );
  }
}

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      formValid: false,
      formErrors: {},
      checked: false,
      isValid: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
      var item = this.state.values;

      if (!item.length) {
        item[this.props.nid] = {};
        item[this.props.nid][this.props.paso] = {};
      }

      item[this.props.nid][this.props.paso][this.props.id] = e.target.checked;
      this.setState({
        values : item,
      });


  }

  render() {
    let value = false;
    if (this.state.values[this.props.nid]) {
      value = this.state.values[this.props.nid][this.props.paso][this.props.id];
    }

    return (
      <label>
        <input value={value} type="checkbox" onChange={this.toggle}/> {this.props.label}
      </label>
    );
  }
}

ReactDOM.render(
  <Message name="Jose"/>, 
  document.getElementById('app')
);
