'use strict';

const currentDate = new Date();
export let currentTime = currentDate.toLocaleTimeString('de-DE', {hour: '2-digit', minute: '2-digit'});
