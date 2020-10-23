const patternHelper = require('./PatternHelper');

var AsyncQueue = function(tasks = [], concurrency = 1) {
    this.total = tasks.length;
    this.todo = tasks;
    this.running = [];
    this.complete = [];
    this.count = concurrency;
    this.mediumPattern = 'medium.com';

    AsyncQueue.prototype.canRunNext = function () {
        return ((this.running.length < this.count) && this.todo.length);
    }

    AsyncQueue.prototype.checkValid = function (url) {
        return patternHelper.checkMediumUrl(url)
            && patternHelper.checkValidUrl(url);
    }

    AsyncQueue.prototype.run = function (scrapeCallback) {
        while (this.canRunNext()) {
            const currUrl = this.todo.shift();
            if (this.checkValid(currUrl)) {
                scrapeCallback(currUrl)
                    .then((res) => {
                        console.log(res);
                        this.complete.push(this.running.shift());
                        this.run();
                    })
            };
            this.running.push(currUrl);
        }
    }

    AsyncQueue.prototype.addTask = function (task) {
        this.todo.push(...task);
    }
}

module.exports = AsyncQueue;
// const promise = () => new Promise((resolve, reject) => {
//     resolve(() => setTimeout(function() {
//         console.log('finished')
//     }, 5000));
// })

// const data = [];
// for (let i = 0; i < 100000; i++) {
//     data.push(promise());
// }
// const asyncQueue = new AysncQueue(data, 3);
// asyncQueue.run();