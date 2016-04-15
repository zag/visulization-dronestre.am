import React from 'react';
import {render} from 'react-dom';
import store from './store/FactsData';
import rd3 from 'react-d3'; 
//for demo 
import FactsActions from './actions/FactsActions';

// zoom down 10%
function _calculateSizes(wh) {
    return { 
        width: wh.width - (wh.width/10),
        height: wh.height - (wh.height/10)
        }
} 

class App extends React.Component {
  constructor() { 
    super();
    store.updateAll();
    this.state = {
            viewport : _calculateSizes({
                    width: window.innerWidth, 
                    height: window.innerHeight}),
            facts : store.getAll()};  

    this.onChange = this.onChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    store.addChangeListener(this.onChange);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
}

  componentWillUnmount() {
    store.removeChangeListener(this.onChange);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
  }
  
  onChange() { 
    this.setState({ facts: store.getAll()});
   }

  handleResize() {
      let viewport = _calculateSizes({width: window.innerWidth, height: window.innerHeight});
      if (this.state.viewport.width !== viewport.width ||
        this.state.viewport.height !== viewport.height) {
        this.setState({ viewport }); 
      }
    };
 
  render () { 
    var d = this.state.facts;
    if ( ! d["Pakistan"] )  {return <span>wait</span> };
    var BarChart = rd3.BarChart;  
    var barData = [
      { 
        "name": "Pakistan",
        "values": [
          { "x": 2014, "y":  d.Pakistan['2014']},
          { "x": 2015, "y":  d.Pakistan['2015']},
          { "x": 2016, "y":  d.Pakistan['2016']},
          ]
      },
      { 
        "name": "Yemen",
         "values": [
          { "x": 2014, "y":  d.Yemen['2014']},
          { "x": 2015, "y":  d.Yemen['2015']},
          { "x": 2016, "y":  d.Yemen['2016']},
            ]
      },
      { 
        "name": "Somalia",
         "values": [
          { "x": 2014, "y":  d.Somalia['2014']},
          { "x": 2015, "y":  d.Somalia['2015']},
          { "x": 2016, "y":  d.Somalia['2016']},
            ]
      }
    ];    

  return <BarChart  
      data={barData} 
      width={this.state.viewport.width}
      height={this.state.viewport.height} 
      fill={'#3182bd'}
      title='Deaths in 2014-2015 years per country'
      legend={true}
      yAxisLabel='deaths'
      xAxisLabel='year'
    />
    }
}

render(<App/>, document.getElementById('app'));


