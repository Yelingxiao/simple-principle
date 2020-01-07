const queue = [];
const p = Promise.resolve();

let isFlushing = false;

export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

export function queueJob(job) {
  if (queue.indexOf(job) === -1) {
    queue.push(job);
    if (!isFlushing) {
      nextTick(flushJobs);
    }
  }
}

function flushJobs(seenJobs) {
  isFlushing = true;
  let job;
  while ((job = queue.shift())) {
    job();
  }
  isFlushing = false;
  // some postFlushCb queued jobs!
  // keep flushing until it drains.
  if (queue.length) {
    flushJobs(seenJobs);
  }
}
