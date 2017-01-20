(function(global) {
    
    var _lazyMan = function(name) {
        this.tasks = [];
        this.name = name;

        var self = this;
        var firstTask = function() {
            console.log(`Hi, ${name}`);
            self.next();
        };

        this.tasks.push(firstTask);
        setTimeout(function() {
            self.next();
        }, 0);
    };

    var fn = _lazyMan.prototype;
    fn.eat = function(taskName) {
        var self = this;
        var task = function() {
            setTimeout(function() {
                console.log(`Eat ${taskName}`);
                self.next();
            }, 0);
        };

        self.tasks.push(task);
        return self;
    };

    fn.next = function() {
        var task = this.tasks.shift();
        task && task();
    };

    /**
     * @param {Number} time unit: second
     */
    fn.sleep = function(time) {
        var self = this;
        
        var task = function() {
            setTimeout(function() {
                console.log(`Wake up after ${time}s`);
                self.next();
            }, time * 1000);
        };

        self.tasks.push(task);
        return self;
    };

    fn.sleepFirst = function(time) {
        var self = this;

        var task = function() {
            setTimeout(function() {
                console.log(`Wake up after ${time}s`);
                self.next();
            }, time*1000);
        };

        self.tasks.unshift(task);
        return self;
    };

    global.LazyMan = function(name) {
        return new _lazyMan(name);
    };

})(window);
