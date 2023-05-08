(function (doc, win, DOM) {
            
    'use strict';

    var app = function app(){
    var dom = new DOM('[data-js="identifi"]');

    return{ 
        init: function init(){
            this.ajaxCompany();
            this.eventButton();
        },

        ajaxCompany: function ajaxCompany(){
            var company = new XMLHttpRequest()
            company.open('get', 'company.json');
            company.send('');
            company.addEventListener('readystatechange', this.statusRequestCompany, false);
        },

        statusRequestCompany: function statusRequest(){
            if(!app().isReady.call(this))
                return;    
            doc.querySelector('#li-name').innerHTML = dom.get(this, "name");
        },

        isReady: function isReady(){
            return this.readyState == 4 && this.status == 200; 
        },

        eventButton: function eventButton(){
            var button = new DOM('.iRegister');
            button.on(this.elemValue);
        },

        elemValue: function elemValue(){
            var inputsVal = []
            doc.querySelectorAll('[data-js="identifi"]').forEach(function(item){
                inputsVal.push(item.value)
            }); app().methodPost(inputsVal);
        },

        methodPost: function methodPost(inputsVal){
            var post = new XMLHttpRequest();
            post.open('post', 'http://localhost:3000/car');
            post.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            post.send(`image=${inputsVal[0]}&brandModel=${inputsVal[1]}&year=${inputsVal[2]}&plate=${inputsVal[3]}&color=${inputsVal[4]}`);
            this.methodGet()
        },

        methodGet: function methodGet(){
            var get = new XMLHttpRequest();
            get.open('get', 'http://localhost:3000/car');
            get.send('');
            get.addEventListener('readystatechange', this.statusRequestCars, false);
        },

        statusRequestCars: function statusRequestCars(){
            if(app().isReady.call(this))
                app().createElements(this);
        },

        createElements: function createElements(carsRequest){
            var newRow = doc.querySelector('tbody').appendChild(doc.createElement("tr"));
            var Car = JSON.parse(carsRequest.responseText)[(JSON.parse(carsRequest.responseText).length) -1];
            for (const key in Car) {
                    const element = Car[key];
                    newRow.appendChild(this.returnElemDom(element))
            }
            this.EventRemovButton((this.addRemovButton(newRow).className));
        },

        returnElemDom: function returnElemDom(item){
            if(/^https:\/\//.test(item) == true)
                return this.isaPicture(item);
            else
                return this.createTD(item)
        },

        createTD: function createTD(item){
            var element = doc.createElement('td');
            element.innerHTML = item;
            return element;
        },

        isaPicture: function isaPicture(item){
            var element = doc.createElement('img');
            element.setAttribute('src', item)
            return element;
        },

        addRemovButton: function(newRow){
            var tdRemov = doc.createElement('td');
            tdRemov.innerHTML = 'Remove';
            newRow.appendChild(tdRemov);    
            tdRemov.setAttribute('class', 'Remov' + this.createClassNumber())
            return tdRemov
        },

        createClassNumber: function(){
            var classNumber = Math.ceil(Math.random() * 100)
            return classNumber
        },

        EventRemovButton: function EventRemovButton(identificator){
            var DOMIdenti = '.'+ identificator;
            var EventTdRemov = new DOM (DOMIdenti);
            EventTdRemov.on(this.removeRow);
        },

        removeRow: function removeRow(){
            this.parentNode.remove()
        },

    }
}

console.log(app().init());

})(document, window, window.DOM);