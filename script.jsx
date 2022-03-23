class TimerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timerLeft: null,
            timer: null,
            pause: false,
            reset: false
        }
        this.startTimer = this.startTimer.bind(this)
        this.pauseTimer = this.pauseTimer.bind(this)
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer)
        let timer = setInterval(()=> {
            console.log('2: Inside of setInterval')
            if(this.state.pause) {
                clearInterval(this.state.timer)
                return
            }
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

    pauseTimer (timeLeft) {
        this.setState({
            pause: !this.state.pause
        })
        console.log(this.state.timeLeft)
        if(this.state.pause) {
            this.startTimer(this.state.timeLeft)
        }
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
                <Pause timeLeft = {this.state.timeLeft} pauseState={this.state.pause} pauseTimer={this.pauseTimer}></Pause>
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

const Pause = (props) => {
    if(props.timeLeft == null || props.timeLeft == 0) {
        return <div/>
    }
    let className = (props.pauseState ? 'btn-success' : 'btn-outline-danger') + ' btn rounded-circle mx-2 p-0'
    return (
        <button type="button"
            className={className}
            onClick={()=>{props.pauseTimer(props.time)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pause"
                 viewBox="0 0 512 512">
                <path d="M162.642 148.337h56.034v215.317h-56.034v-215.316z"/>
                <path d="M293.356 148.337h56.002v215.317h-56.002v-215.316z"/>
            </svg>
        </button>
    )
}

ReactDOM.render(
    <TimerWrapper/>,
    document.getElementById('timer-app')
)