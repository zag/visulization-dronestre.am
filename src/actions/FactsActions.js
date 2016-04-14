/*
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * FactActions
 */

import AppDispatcher from '../core/AppDispatcher';
import FactsConstants from '../constants/FactsConstants';

var FactsActions = {

  /**
   * @param  {string} text
   */
  nope: function() {
    AppDispatcher.dispatch({
      actionType: FactsConstants.FACTS_NOPE,
      text: text
    });
  },


};

module.exports = FactsActions;
