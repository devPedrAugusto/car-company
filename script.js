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
            company.addEventListener('readystatechange', this.statusRequest, false);
        },

        statusRequest: function statusRequest(){
            if(!app().isReady.call(this))
                return;    
            doc.querySelector('#li-name').innerHTML = dom.get(this, "name")
            //doc.querySelector('#span-phone').innerHTML = dom.get(this, "phone")
        },

        isReady: function(){
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
            }); app().createElements(inputsVal);
        },

        createElements: function createElements(inputsVal){
            var newRow = doc.querySelector('tbody').appendChild(doc.createElement("tr"));
            for(var index = 0; index < doc.querySelectorAll('[data-js="identifi"]').length; index++){
                newRow.appendChild(this.returnElemDom(inputsVal[index]))
            };            
            this.EventRemovButton((this.addRemovButton(newRow).className));
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
        }
    }
}

console.log(app().init());

})(document, window, window.DOM);