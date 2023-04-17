(function(doc){
function DOM(elements){ 
    this.elements = doc.querySelectorAll(elements)
};

var methodOn = function on(e){
    e.preventDefault();
    console.log('Você clicou que eu vi');
};

DOM.prototype.on = function on(event){
    this.elements.forEach(function(item){
        item.addEventListener('click', event)
    });
};

DOM.prototype.off = function off(){
    Array.prototype.forEach.call( this.element, function(){
        removeEventListener('click', methodOn);
    })
};

DOM.prototype.get = function get(item, index){
    return JSON.parse(item.responseText)[index];
};            

DOM.prototype.forEach = function forEach(){
    return Array.prototype.forEach.apply(this.element, arguments)
}

DOM.prototype.map = function map(){
    return Array.prototype.map.call(this.element, function(item){
        return item.hasAttributes();
    });
}

DOM.prototype.filter = function filter(){
    return Array.prototype.filter.call(this.element, function(item){
        return item.getAttribute('id');
    })
}

DOM.prototype.reduce = function reduce(){
    return Array.prototype.reduce.call(this.element, function(more, item){
        return more.firstChild.nodeValue + ' & ' +  item.firstChild.nodeValue;
    });
}

DOM.prototype.reduceRight = function reduce(){
    return Array.prototype.reduceRight.call(this.element, function(more, item){
        return more.firstChild.nodeValue + ' & ' +  item.firstChild.nodeValue;
    });
}

DOM.prototype.every = function every(){
    return Array.prototype.every.call(this.element, function(item){
        return item.getAttribute('id');
    });
}

DOM.prototype.some = function some(){
    return Array.prototype.some.call(this.element, function(item){
        return item.getAttribute('id');
    });
}

DOM.prototype.isArray = function isArray(item){
    return Object.prototype.toString.call(item) === '[object Array]'
}

DOM.prototype.isObject = function isObject(item){
    return Object.prototype.toString.call(item) === '[object Object]';
}

DOM.prototype.isFunction = function isFunction(item){
    return Object.prototype.toString.call(item) === '[object Function]';
}

DOM.prototype.isNumber = function isNumber(item){
    return Object.prototype.toString.call(item) === '[object Number]';
}

DOM.prototype.isString = function isString(item){
    return Object.prototype.toString.call(item) === '[object String]';
}

DOM.prototype.isBoolean = function isBoolean(item){
    return Object.prototype.toString.call(item) === '[object Boolean]';
}

DOM.prototype.isNull = function isNull(item){
    return Object.prototype.toString.call(item) === '[object Undefined]' 
    || Object.prototype.toString.call(item) === '[object Null]';
}

window.DOM = DOM;

})(document)