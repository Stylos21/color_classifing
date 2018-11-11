const tf = require('@tensorflow/tfjs');
const colors = require('./colors.json');
const readline = require('readline');

var red;
var blue;
var green;

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
const redQ = () => {
    
    return new Promise((res, err) => {
        rl.question('Gimmie a red value. ', color => {
            red = color;
            blueQ()
        })
    })
}
const blueQ = () => {
    return new Promise((res, err) => {
        rl.question('Gimmie a blue value. ', color => {
            blue = color;
            greenQ()
        })
    })
}
const greenQ = () => {
    return new Promise((res, err) => {
        rl.question('Gimmie a green value. ', color => {
            green = color;
            train();
        })
    })
}


const xs = tf.tensor2d(colors.map(color => [
    color.red, color.blue, color.green
]))

const ys = tf.tensor2d(colors.map(color => [
    color.color == "red" ? 1 : 0,
    color.color == "green" ? 1 : 0,
    color.color == "blue" ? 1 : 0,
    color.color == "yellow" ? 1 : 0,
    color.color == "orange" ? 1 : 0,
    color.color == "pink" ? 1 : 0,
    color.color == "purple" ? 1 : 0,
    color.color == "black" ? 1 : 0,
    color.color == "white" ? 1 : 0,
    color.color == "grey" ? 1 : 0
]))



const labels = [
    'red',
    'blue',
    'green',
    'yellow',
    'orange',
    'pink',
    'purple',
    'black',
    'white',
    'grey'
]
function train(){
const model = tf.sequential();
model.add(tf.layers.dense({
    inputShape: [3],
    activation: "sigmoid",
    units: 5
}))
model.add(tf.layers.dense({
    inputShape: [5],
    activation: "sigmoid",
    units: 10

}))


model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.1)
})
model.fit(xs, ys, { epochs: 100 })
    .then(() => {
        const res = model.predict(tf.tensor2d([red, green, blue], [1, 3]));
        const index = res.argMax(1).dataSync()[0];
        console.log(labels[index]);
    })
    rl.close();

}
const main = async () => {
    await redQ();
    await blueQ();
    await greenQ();
    rl.close();
}
main();