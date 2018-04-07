//ReactJS console replicator library

//You capture console.log and pass it as an array to the library


console.log(1,2,3,4)


// =>
['log', [1,2,3,4]]

['return', 'asd']


<Console logs={this.state.logs} />



Console.hook(console, (message) => {
  this.setState({
    logs: [...logs, message]
  })
})
Console.hook(document.getElementsByTagName('iframe')[0].contentWindow.console)
