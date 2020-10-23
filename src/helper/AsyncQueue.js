var AsyncQueue = function (tasks = [], concurrency = 1) {
    this.total = tasks.length;
    this.todo = tasks;
    this.running = -2;
    this.count = concurrency;

    AsyncQueue.prototype.canRunNext = function () {
        return (this.running < this.count) && this.todo.length;
    }

    AsyncQueue.prototype.run = function (scrapeCallback) {
        while (this.canRunNext()) {
            this.running++;
            const currUrl = this.todo.shift();
            scrapeCallback(currUrl)
                .then((res) => {
                    console.log(res);
                    this.running--;
                    this.run(scrapeCallback);
                })

            console.log(this.running);
            if (this.running >= this.count) {
                console.log('Bug in code, running value should never exceed 4');
            }
        }
    }

    AsyncQueue.prototype.addTask = function (task, scrapeCallback) {
        this.todo.push(task);
    }
}

module.exports = AsyncQueue;