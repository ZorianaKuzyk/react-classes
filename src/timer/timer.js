import React, { Component } from "react";
import "./timer.css";

export default class Timer extends Component {
  state = {
    from: 0,
    interval: 100,
    beginDate: Date.now(),
    autoStart: false,
    pause: false,
    waitingDate: 0,
    electron: "00",
    startButton: "Start",
    intervalID: 0,
  };

  componentDidMount = () => {
    this.setState({ from: this.props.from });
    this.setState({ interval: this.props.interval });
    this.setState({ autoStart: this.props.autoStart });
    this.calcElectron(this.props.from);
    if (this.props.autoStart) this.initClock();
  };

  onTimeEnd = () => console.log("Час вийшов!");
  onTimeStart = () => console.log("Таймер запущено!");
  onTimePause = () => console.log("Таймер на паузі!");

  initClock = async () => {
    if (this.state.action && !this.state.pause) {
      this.onTimePause();
      await this.setState({ waitingDate: Date.now() });
      await this.setState({ startButton: "Start" });
      await this.setState({ pause: true });
      clearInterval(this.state.intervalID);
    } else {
      if (this.state.action && this.state.pause) {
        await this.setState({
          waitingDate: Date.now() - this.state.waitingDate,
        });
        await this.setState({
          beginDate: this.state.beginDate + this.state.waitingDate,
        });
        await this.setState({ waitingDate: 0 });
        await this.setState({ startButton: "Pause" });
        await this.setState({ pause: false });
      } else {
        this.onTimeStart();
        await this.setState({ beginDate: Date.now() });
        await this.setState({ startButton: "Pause" });
        await this.setState({ action: true });
        await this.setState({ pause: false });
      }
      this.setState({
        intervalID: setInterval(async () => {
          this.calcElectron();
          const curTime = Date.now() - this.state.beginDate;
          if (curTime > this.state.from * 1000) {
            this.onTimeEnd();
            if (this.state.infinity) {
              this.setState({ beginDate: Date.now() });
              this.setState({ pause: 0 });
            } else {
              clearInterval(this.state.intervalID);
              this.setState({ action: false });
              this.setState({ startButton: "Start" });
            }
          }
        }, this.state.interval),
      });
    }
  };

  calcElectron = (init = undefined) => {
    let calcTime = init;
    let ele;
    let tempTime;
    if (!init) {
      tempTime = Date.now() - this.state.waitingDate - this.state.beginDate;
      calcTime = (this.state.from - tempTime / 1000).toFixed();
    }
    ele = calcTime >= 10 ? calcTime.toString() : "0" + Math.abs(calcTime);
    if (this.state.action || init) this.setState({ electron: ele });
    else this.setState({ electron: "00" });
  };

  render() {
    return (
      <div className="container">
        <div className="timer">
          <div className="timer__counter" onClick={this.out}>
            {this.state.electron}
          </div>
          <button className="timer__button" onClick={this.initClock}>
            {this.state.startButton}
          </button>
        </div>
      </div>
    );
  }
}
