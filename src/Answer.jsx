import React from 'react';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    // We only read the communications config on creation
    this.appConfig = new appConfig(props.config);

    this.state = {
      ready: false,
      timestamp: null,
      user: {},
    };
  }

  componentDidMount() {
    this.appConfig.answerSetData( (data) => this.setState({timestamp: data.timestamp, user: data.user, ready: true}));
  }

  renderLoading() {
    return (
      <div>
        <h1>{'Loading...'}</h1>
      </div>
    );
  }
  renderLoaded(){
    return (
      <div>
        <Header
          config={this.props.config}
          user={this.state.user}
        />
        <h1>{'Answer'}</h1>
        <h3>{`Time: ${this.state.timestamp}`}</h3>
      </div>
    );
  }
  render() {
    return (
      <div>
        {!this.state.ready && this.renderLoading()}
        {this.state.ready && this.renderLoaded()}
      </div>
    );
  }
}

export default Answer;