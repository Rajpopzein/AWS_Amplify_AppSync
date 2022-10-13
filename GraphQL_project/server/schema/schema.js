const { graphql, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = require("graphql");



//create type
const userType = new GraphQLObjectType(
    {
        name: 'User',
        description:'Documentation for user....',
        fields:()=>({
            id:{type:GraphQLString},
            name:{type:GraphQLString},
            age:{type:GraphQLInt}
        })
    }
)

//rootquery
const rootquery = new GraphQLObjectType({
    name:'RootQueryDocumentation',
    description:'Description',
    fields:{
        user: {
            type:userType,
            args:{
                id:{type:GraphQLString}
            },
            
            resolve(parent,args)
            {
                //where we get data from api or frontend
                //we resolve with data
                //get and return data from data source
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:rootquery
})
