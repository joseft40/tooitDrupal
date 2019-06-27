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
              isCorrect: false,
            },
            {
              title: 'pregunta numero 2',
              isCorrect: false,
            },
            {
              title: 'pregunta numero 3',
              isCorrect: false,
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
              isCorrect: false,
            },
            {
              title: 'pregunta numero 2',
              isCorrect: true,
            },
            {
              title: 'pregunta numero 3',
              isCorrect: false,
            },
          ]
        },
        {
          text : 'pregunta numero 2',
          answers: [
            {
              title: 'pregunta numero 4',
              isCorrect: false,
            },
            {
              title: 'pregunta numero 5',
              isCorrect: true,
            },
            {
              title: 'pregunta numero 6',
              isCorrect: true,
            },
          ]
        }
      ]
    };
  }

  render() {
    this.updateQuestion();

    let itemList = this.props.ids.map((item, i) => {
      if (questions[item] && questions[item].question.length) {
        return (
          <li key={item}>
            <ItemForm nid={item} key={i}/>
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
      data: {},
      step: 0,
      error: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var element = questions[this.props.nid];
    var question = element.question[this.state.step];

  }

  handleValidate() {
    //value is required
    if (this.state.data[this.state.step - 1] == undefined) {
      this.setState(state => ({
        step: state.step - 1,
        error: true
      }));
      return false;
    }

    var element = questions[this.props.nid];
    if (element.question[this.state.step - 1] != undefined) {
      var count = 0;
      var question = element.question[this.state.step - 1];

      //total number of correct answers
      for (let i=0; i<question.answers.length; i++) {
        if (question.answers[i].isCorrect === true) {
          count = count + 1;
        }
      }

      //validate correct answers
      for (let i=0; i<question.answers.length; i++) {
        if (this.state.data[this.state.step - 1][i] != undefined) {
          if (question.answers[i].isCorrect === false && this.state.data[this.state.step - 1][i] === true
            || question.answers[i].isCorrect === true && this.state.data[this.state.step - 1][i] === false
            && this.state.data[this.state.step - 1].length != count) {
            this.setState(state => ({
              step: state.step - 1,
              error: true
            }));
            return false;
          }
        }
      }

      //validar numero de opciones


    }
  }

  previousStep(e) {
    e.preventDefault();
    var data = this.state.data;

    this.setState(state => ({
      step: state.step - 1,
      data: data,
      error: false
    }));
  }

  nextStep(e) {
    e.preventDefault();
    var data = this.state.data;

      //incrementar step
      this.setState(state => ({
        step: state.step + 1,
        data: data,
    }), () => {
      this.handleValidate();
    });

  }

  toggle(e) {
    var item = this.state.data;

    if (item[this.state.step] == undefined) {
      item[this.state.step] = {};
    }

    item[this.state.step][e.target.id] = e.target.checked;
    this.setState(state => ({
      step: state.step,
      data : item,
      error: false
    }));
  }

  render() {
    var element = questions[this.props.nid];
    var question = {};

    if ((this.state.step + 1) <= element.question.length) {
      question = element.question[this.state.step];

      var answers = question.answers.map((value, key) => {
        let data = false;
        if (this.state.data[this.state.step]) {
          data = this.state.data[this.state.step][key];
        }
        return (
          <div className="form-check">
            <input className="form-check-input" id={key} value={data} checked={data} type="checkbox" onChange={this.toggle}/>
            <label className='col-md-6 form-check-label'> {value.title}</label>
          </div>
        );
      });
    }

    return (
      <div>
      {this.state.step  < element.question.length ? (
        <div className="border-bottom border-success pt-3 pb-3 pt-5">

          <form onSubmit = {this.handleSubmit} key={this.props.nid}>
            <h3 className="text-center">Formulario #{element.title}</h3>
            <ul className="nav nav-tabs">
            { element.question.map((item, i) => (
              <li className="nav-item col-md-2 text-center text-info bg-light pt-2">
                <a className={i === this.state.step ? "nav-link active text-success" : "nav-link"} href="#">Step #{i}</a>
              </li>
            )) }
            <li className="nav-item col-md-2 text-center text-info bg-light pt-2">
              <a className={element.question.length + 1 === this.state.step ? "nav-link active text-success" : "nav-link"} href="#">Step #{element.question.length + 1}</a>
            </li>
            </ul>

            <div className="p-3">
              <div className="pt-3"><h4>{question.text}</h4></div>
              {this.state.error == true ? (
                <div className="alert alert-danger col-md-8"> try again</div>
              ) : ''}

              <div>{answers}</div>

              <div className="actions submit-form">
                {this.state.step > 0 ? (
                  <div className="col-md-4 mt-3">
                    <button className="btn btn-warning mr-5" type="submit" onClick={this.previousStep.bind(this)}> Regresar </button>
                    <button className="btn btn-success" type="submit" onClick={this.nextStep.bind(this)} id={this.props.nid}> Continuar </button> 
                  </div>
                ): (
                  <button className="btn btn-success" type="submit" onClick={this.nextStep.bind(this)} id={this.props.nid}> Continuar </button>
                )}
               </div>
             </div>
          </form>
        </div>
      ) : (
          <div className="p-3">
            <h3 className="text-center">Formulario #{element.title}</h3>
            <div className="border-bottom border-success pt-3 pb-3 pt-5">
            <div className="bg-light text-success p-3"><h4>Congratulations!!!</h4></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <Message name="Jose"/>, 
  document.getElementById('app')
);
