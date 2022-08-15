const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/nodeExpressServer';

const connect = mongoose.connect(url);

connect.then(() => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza',
        description: "Test"
    }).then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: "Updated Test" }
        },
        {
            new: true
        }
        ).exec();

    }).then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: "i like it :)",
            author: 'James'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.remove({}).exec();

    }).then(() => {

        return mongoose.connection.close();

    }).catch((err) => {

        console.log(err);

    });
});

