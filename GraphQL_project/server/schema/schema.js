const { graphql, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = require("graphql");



//create type
const userType = new GraphQLObjectType(
    {
        name: 'User',
        description:'Documentation for user....',
        fields:()=>({
            id:{type:GraphQLString},
            name:{type:GraphQLString},
            age:{type:GraphQLInt},
            departmentID:{type:GraphQLString}
        })
    }
)

const depatmentType = new GraphQLObjectType(
    {
        name: 'department',
        description : 'Documentation for department',
        fields:()=>({
            departmentName:{type:GraphQLString},
            departmentID:{type:GraphQLString}
        })
    }
)

//rootquery
const rootquery = new GraphQLObjectType({
    name:'RootQuery',
    description:'Description',
    fields:{
        user: {
            type:userType,depatmentType,
            //Argument need to getting data 
            args:{
                id:{type:GraphQLString}
            },

            resolve(parent,args)
            {
                let department = {
                    departmentID:"123456",
                    departmentName:"InformationTechnology"
                }

                let user ={
                    name:"rajkumar.r",
                    age: 24,
                    id : "1234",
                    departmentID: department.departmentID
                }

                return user 
                //where we get data from api or frontend
                //we resolve with data
                //get and return data from data source
            }
        }
    }
})

//exporting GraphQlSchema with root query
module.exports = new GraphQLSchema({
    query:rootquery
})
