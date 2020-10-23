var AsyncQueue = function (tasks = [], concurrency = 1) {
    this.total = tasks.length;
    this.todo = tasks;
    this.running = 0;
    this.count = concurrency;

    AsyncQueue.prototype.canRunNext = function () {
        return (this.running < this.count) && this.todo.length;
    }

    AsyncQueue.prototype.run = function (scrapeCallback) {
        while (this.canRunNext()) {
            const currUrl = this.todo.shift();
            scrapeCallback(currUrl)
                .then((res) => {
                    this.running--;
                    this.run();
                })
            this.running++;
            if (this.running >= this.count) {
                console.error('Bug in code, running value should never exceed 4');
            }
        }
    }

    AsyncQueue.prototype.addTask = function (task) {
        this.todo.push(task);
    }
}

module.exports = AsyncQueue;