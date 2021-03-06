/**
 * TutorStudent model events
 */

'use strict';

import {EventEmitter} from 'events';
var TutorStudent = require('../../sqldb').TutorStudent;
var TutorStudentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TutorStudentEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  TutorStudent.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TutorStudentEvents.emit(event + ':' + doc._id, doc);
    TutorStudentEvents.emit(event, doc);
    done(null);
  };
}

export default TutorStudentEvents;
