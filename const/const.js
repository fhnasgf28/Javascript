const car = {type: 'Fiat', model: '500', color: 'white'}

// add a property
car.color = 'red';

car.owner = 'Johnson';

document.getElementById('demo').innerHTML = 'car owner is' + car.owner;