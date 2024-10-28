let user = {

}

function sayHi() {
    alert("Hello");
}

user.sayHi = sayHi;
user.sayHi();

user = {
    sayHi: function () {
        alert("Hello");
    }
}

// methode ringkaas terlihat bagus 
user = {
    sayHi() {
        alert("Hello");
    }
}

let user = {
    firstName: "John",
    sayHi() {
        let arrow = () => alert(`Hello, ${this.firstName}`);
        arrow();
    }
}