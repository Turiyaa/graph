import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from "react-graph-vis";
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
      edges:[]
    };

    this.handleIJK = this.handleIJK.bind(this);
    this.handleKMS = this.handleKMS.bind(this);
  }

  componentDidMount(){
  console.log("Tada");
  fetch('./kmsNodes.json')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      kmsNodes: apts,
    })
  });

  fetch('./kmsEdges.json')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      kmsEdges: apts,
    })
  });

  fetch('./ijkEdges.json')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      ijkEdges: apts,
    })
  });

  fetch('./ijkNodes.json')
  .then(response => response.json())
  .then(result => {
    const apts = result.map(item => {
      return item;
    })
    this.setState({
      ijkNodes: apts,
    })
  });
}

handleKMS(){
  this.setState({
    edges: this.state.kmsEdges,
    nodes: this.state.kmsNodes
  })
}

handleIJK(){
  this.setState({
    edges: this.state.ijkEdges,
    nodes: this.state.ijkNodes
  })
}
render() {
  const graph = {
    // nodes:this.state.ijkNodes,
    // edges:this.state.ijkEdges

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

      <h1 align ="center">Kruskal MST</h1>
      <div align = "center">
      <button className ="button"  onClick={() => this.handleKMS()}>KMS</button>
      <button className ="button"  onClick={() => this.handleIJK()}>Shortest Path</button>
      </div>
      <Graph graph={graph} options={options} events={events} style={{ height: "1000px" }} />
    </div>
  );
}
}

export default App;
