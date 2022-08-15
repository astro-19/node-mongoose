const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/nodeExpressServer';

const connect = mongoose.connect(url);

connect.then(() => {
    console.log('Connected correctly to server');

    var newDish = Dishes({
        name: 'Uthappizza',
        description: "Test"
    });

    newDish.save().then((dish) => {
        console.log(dish);

        return Dishes.find({});
    }).then((dishes) => {
        console.log(dishes);

        return Dishes.remove({});
    }).then(() => {
        return mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    });
});