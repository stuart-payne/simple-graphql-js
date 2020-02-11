var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Person {
        id: ID!
        name: String
        occupation: String
    }

    type Query {
        getPeople: [Person]
        getPersonById(id: ID): Person
        getPersonByName(name: String): Person
        getPersonByOccupation(occupation: String): Person
    }
`);

class Person {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.occupation = data.occupation;
    }
}

var root = {
    getPeople() {
        return fakeDatabase;
    },
    getPersonById: ({id}) => {
        return fakeDatabase[id];
    },
    getPersonByName: ({name}) => {
        return fakeDatabase.find(person => person.name === name);
    },
    getPersonByOccupation: ({occupation}) => { 
        return fakeDatabase.find(person => person.occupation === occupation);
    }
};

var fakeDatabase = [
    {
        id: 0,
        name: 'Stuart',
        occupation: 'Developer'
    },
    {
        id:1,
        name: 'Fred',
        occupation: 'Cat'
    },
    {
        id: 2,
        name: 'Jeff',
        occupation: 'Charlatan'
    },
    {
        id: 3,
        name: 'John',
        occupation: 'Bank'
    }
];

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');