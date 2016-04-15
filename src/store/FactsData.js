import react from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'events';
import  FactsConstants  from '../constants/FactsConstants';
import  AppDispatcher from '../core/AppDispatcher';
import 'fetch-polyfill';

var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _facts = {};

const store = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of items.
   * @return {object}
   */
  getAll: function() {
    return _facts;
  },
// prepare data for charts
  _convert_to_year_contry_year: function(data) {
    var list = data.strike;
    var res = {};
    for ( let i = 0;  i  < list.length; i++) { 
        var v = list[i];
        var year = (new Date(v.date)).getFullYear();
        if (typeof res[v.country] === "undefined") {
                    res[v.country]={};
        }
        if (typeof res[v.country][year] === "undefined") {
                    res[v.country][year] = 0;
        }
        res[v.country][year] += parseInt(v.deaths_max|| 0) 

    }
        _facts = res;
        this.emitChange(); //send event

  },
  updateAll: function () {
    console.log("Update all");
/*    let myHeaders = new Headers;
    myHeaders.append('Access-Control-Allow-Origin','GET,OPTIONS');
    let myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'no-cors',
               cache: 'default' }; 
    fetch('http://api.dronestre.am/data', myInit) */
    fetch('/data.json') 
      .then(function(response) {
        return response.json() 
      }).then(function(json) {
        console.log('parsed json', json);
        _facts = store._convert_to_year_contry_year(json);


      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
    this.emitChange();
  }, 
 
  onStorageChange: function (e) {
    this.emitChange();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }


});
// Register callback to handle all updates
AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case FactsConstants.FACTS_NOPE:
      console.log('nope')
      break;
    default:
      // no op
  }
});

export default store;

