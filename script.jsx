class TimerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeLeft: null,
            timer: null,
            pause: false,
            reset: false
        }
        this.startTimer = this.startTimer.bind(this)
        this.controlTimer = this.controlTimer.bind(this)
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer)

        // resetTimer
        if(this.state.reset) {
            return this.setState({
                timeLeft: null,
                timer: null,
                pause: false,
                reset: false
            })
        }
        // pauseTimer
        if(this.state.pause) return

        let timer = setInterval(()=> {
            console.log('2: Inside of setInterval')
            var timeLeft = this.state.timeLeft - 1
            if(timeLeft == 0) {
                clearInterval(timer)
                document.getElementById('end-of-time').play()
            }
            this.setState({
                timeLeft: timeLeft
            })
        }, 1000)
        console.log('1: Inside of setInterval')
        return this.setState({
            timeLeft: timeLeft,
            timer: timer
        })
    }

    async controlTimer (action) {
        await this.setState({ [action]: !this.state[action] })
        this.startTimer(this.state.timeLeft)
    }

    render() {
        return (
            <div className="row-fluid">
                <h2>Timer</h2>
                <div className="btn-group" role="group">
                    <Button time="5" startTimer={this.startTimer}></Button>
                    <Button time="10" startTimer={this.startTimer}></Button>
                    <Button time="15" startTimer={this.startTimer}></Button>
                </div>
                <ControlButton timeLeft={this.state.timeLeft}
                               state={this.state.pause}
                               event={this.controlTimer}
                               action='pause'
                               icon="bi-pause">
                </ControlButton>
                <ControlButton timeLeft={this.state.timeLeft}
                               state={this.state.reset}
                               event={this.controlTimer}
                               action='reset'
                               icon="bi-arrow-clockwise">
                </ControlButton>
                <Timer timeLeft = {this.state.timeLeft}/>
                <audio id="end-of-time" src="timer_flute_c_long_01.wav" preload="auto"></audio>
            </div>
        )
    }
}

const Timer = (props) => {
    if(props.timeLeft == null || props.timeLeft == 0) {
        return <div/>
    }
    return <h1>Time left: {props.timeLeft}</h1>
}

const Button = (props) => {
    return (
        <button type="button"
                className="btn-secondary btn"
                onClick={()=>{props.startTimer(props.time)}}>
            {props.time} seconds
        </button>
    )
}

const ControlButton = (props) => {
    if(props.timeLeft == null || props.timeLeft == 0) {
        return <div/>
    }
    let ButtonClassName = (props.state ? 'btn-success' : 'btn-outline-danger') + ' btn rounded-circle mx-2 p-0'
    let IconClassName = props.icon + ' bi'
    return (
        <button type="button"
            className={ButtonClassName}
            style={{width: 30, height: 30}}
            onClick={()=>{props.event(props.action)}}>
            <i className={IconClassName}></i>
        </button>
    )
}

ReactDOM.render(
    <TimerWrapper/>,
    document.getElementById('timer-app')
)