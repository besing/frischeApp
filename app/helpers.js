'use strict';

const appHelpers = {
  currentHrs: new Date().getHours(),
  currentMins: new Date().getMinutes(),
};
console.debug('Time of Response: ' + appHelpers.currentHrs + ':' + appHelpers.currentMins);

export default appHelpers;
