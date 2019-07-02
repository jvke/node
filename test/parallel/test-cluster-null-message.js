'use strict';
const cluster = require('cluster');
const assert = require('assert');

if (cluster.isMaster) {
  const worker = cluster.fork();

  // Ensure `msg.test` === NaN
  worker.on('message', (msg) => {
    assert.strictEqual(msg.test, NaN);
  });

  worker.on('online', () => {
    process.send({ test: NaN });
  });
} else {
  while (true) {}
}
