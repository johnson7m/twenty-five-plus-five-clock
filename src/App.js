import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerRunning: false,
      isSession: true,
      minutes: 25,
      seconds: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.audioRef = React.createRef();
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  toggleTimer() {
    if (this.state.timerRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    if (!this.state.timerRunning) {
      this.setState({ timerRunning: true });
      this.timerID = setInterval(() => {
        if (this.state.seconds === 0) {
          if (this.state.minutes === 0) {
            console.log('Playing audio')
            this.audioRef.current.currentTime = 0;
            this.audioRef.current.play();
            this.setState(prevState => ({
              isSession: !prevState.isSession,
              minutes: prevState.isSession ? prevState.breakLength : prevState.sessionLength,
              seconds: 0,
            }));
          } else {
            this.setState(prevState => ({
              minutes: prevState.minutes - 1,
              seconds: 59,
            }));
          }
        } else {
          this.setState(prevState => ({
            seconds: prevState.seconds - 1,
          }));
        }
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.timerID);
    this.setState({ timerRunning: false });
  }

  resetTimer() {
    clearInterval(this.timerID);
    this.setState({
      timerRunning: false,
      breakLength: 5,
      sessionLength: 25,
      isSession: true,
      minutes: 25,
      seconds: 0,
    });
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
  }

  handleClick(event) {
    if (event.target.classList.contains('increase')) {
      this.setState(prevState => ({
        [event.target.id.includes('break') ? 'breakLength' : 'sessionLength']: Math.min(60, prevState[event.target.id.includes('break') ? 'breakLength' : 'sessionLength'] + 1),
        minutes: event.target.id.includes('session') && !this.state.timerRunning ? prevState.sessionLength + 1 : prevState.minutes,
      }));
    } else if (event.target.classList.contains('decrease')) {
      this.setState(prevState => ({
        [event.target.id.includes('break') ? 'breakLength' : 'sessionLength']: Math.max(1, prevState[event.target.id.includes('break') ? 'breakLength' : 'sessionLength'] - 1),
        minutes: event.target.id.includes('session') && !this.state.timerRunning ? Math.max(1, prevState.sessionLength - 1) : prevState.minutes,
      }));
    }
  }

  render() {
    return (
      <div>
        <div className='parent'>
          <div className='div1'><h1 id="title">25 + 5 Clock</h1></div>
          <div className="div2">
            <h2 id="break-label">Break Length</h2>
            <button id="break-increment" className="increase" onClick={this.handleClick}><i className="fas fa-plus"></i></button>
            <button id="break-decrement" className="decrease" onClick={this.handleClick}><i className="fas fa-minus"></i></button>
          </div>
          <div className='div3'>
            <h2 id="session-label">Session Length</h2>
            <button id="session-increment" className="increase" onClick={this.handleClick}><i className="fas fa-plus"></i></button>
            <button id="session-decrement" className="decrease" onClick={this.handleClick}><i className="fas fa-minus"></i></button>
          </div>
          <div className="div4"><p id="break-length">{this.state.breakLength}</p></div>
          <div className='div5'><p id="session-length">{this.state.sessionLength}</p></div>
          <div className="div6">
            <h2 id="timer-label">{this.state.isSession ? "Session" : "Break"}</h2>
            <button id='start_stop' onClick={this.toggleTimer}><i className={this.state.timerRunning ? "fas fa-pause" : "fas fa-play"}></i></button>
            <button id="reset" onClick={this.resetTimer}><i className="fas fa-sync-alt"></i></button>
          </div>
          <div className="div7"><p id="time-left">{`${this.state.minutes < 10 ? '0' : ''}${this.state.minutes}:${this.state.seconds < 10 ? '0' : ''}${this.state.seconds}`}</p></div>
        </div>
        <audio ref={this.audioRef} id="beep" preload="auto" src="https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3"/>
      </div>
    );
  }
}

export default App;
