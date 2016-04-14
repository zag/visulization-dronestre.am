import react from 'react';
import {render} from 'react-dom';
import {EventEmitter} from 'events';
import  FactsConstants  from '../constants/FactsConstants';
import  AppDispatcher from '../core/AppDispatcher';
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

  updateAll: function () {
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

