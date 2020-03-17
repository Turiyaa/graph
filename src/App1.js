import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from "react-graph-vis";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class App extends Component {
  constructor(){
    super();
    //never modify state directly
    this.state = {
      kmsNodes: [],
      kmsEdges: [],
      ijkNodes: [],
      ijkEdges: [],
      nodes:[],
      edges:[],
      srcAndTarget:[],
      selected: '',
      targetSelected:'',
      sourceSelected:''
    };

    this.handleIJK = this.handleIJK.bind(this);
    this.handleKMS = this.handleKMS.bind(this);
    this.onTargetSelect = this.onTargetSelect.bind(this);
    this.onSourceSelect = this.onSourceSelect.bind(this);
  }

  componentDidMount(){
  console.log("Tada");
  fetch('http://localhost:8080/GraphyMakeGraphFace/graph/srctarget')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      srcAndTarget: apts.sort(),
    })
  });
}

handleKMS(){
  fetch('http://localhost:8080/GraphyMakeGraphFace/graph/vertices')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      kmsNodes: apts,
    })
  });

  fetch('http://localhost:8080/GraphyMakeGraphFace/graph/edges')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      kmsEdges: apts,
    })
  });

  this.setState({
    edges: this.state.kmsEdges,
    nodes: this.state.kmsNodes
  })
}

handleIJK(){
  console.log('Source: '+ this.state.sourceSelected);
  console.log('Target: '+ this.state.targetSelected);
  console.log('http://localhost:8080/GraphyMakeGraphFace/graph/edges/'+this.state.sourceSelected+'/'+this.state.targetSelected);
  fetch('http://localhost:8080/GraphyMakeGraphFace/graph/edges/'+this.state.sourceSelected+'/'+this.state.targetSelected)
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      ijkEdges: apts,
    })
  });

  fetch('http://localhost:8080/GraphyMakeGraphFace/graph/vertex/'+this.state.sourceSelected+'/'+this.state.targetSelected)
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      ijkNodes: apts,
    })
  });

  this.setState({
    edges: this.state.ijkEdges,
    nodes: this.state.ijkNodes
  })
}

onSourceSelect (option) {
//  console.log('Your Source ', option.label)
  this.setState({sourceSelected: option.label})
}
onTargetSelect (option) {
//  console.log('Your Target', option.label)
  this.setState({targetSelected: option.label})
}

render() {
  console.log("Test");
const defaultOptionS= this.state.sourceSelected
const defaultOptionT= this.state.targetSelected
const placeHolderValueS = typeof this.state.sourceSelected === 'string' ? this.state.sourceSelected : this.state.sourceSelected.label
const placeHolderValueT = typeof this.state.targetSelected === 'string' ? this.state.targetSelected : this.state.targetSelected.label
const opt = this.state.srcAndTarget;

  const graph = {
    nodes:this.state.nodes,
    edges:this.state.edges
  };

  const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

const events = {
  select: function(event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
  }
};
  return (
    <div>
      <h1 align ="center">Graph</h1>
      <div display = "inline">
      <button className ="button"  onClick={() => this.handleKMS()}>KMS</button>
      <Dropdown options={opt} onChange={this.onSourceSelect} value={defaultOptionS} placeholder="Source" />
      <Dropdown options={opt} onChange={this.onTargetSelect} value={defaultOptionT} placeholder="Target" />
      <button className ="button"  onClick={() => this.handleIJK()}>Shortest Path</button>
      </div>
      <Graph graph={graph} options={options} events={events} style={{ height: "1000px" }} />
    </div>
  );
}
}

export default App;
