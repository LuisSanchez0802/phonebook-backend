const mongoose = require('mongoose');

if (process.argv.length < 3 ) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const nameArg = process.argv[3]
const numberArg = process.argv[4]

const url = `mongodb+srv://luis08islas_db_user:${password}@cluster0.8vomffk.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 }) // first argument takes the connection string and the second is an options object where we specify to use IPv4

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (nameArg && numberArg) {
    const person = new Person({
        name: nameArg,
        number: numberArg,
    })

    person.save().then(result => {
        console.log(`added ${nameArg} number ${numberArg} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

