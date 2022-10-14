const express = require('express');
const graphglHTTP = require('express-graphql')

const app = express();

const schema = require('./schema/schema')

app.use('/graphql', graphglHTTP.graphqlHTTP({
    graphiql:true,
    schema:schema
}))


app.listen(4000, () =>{
    //localhost:4000
    console.log('listening for request on port 4000')
})
