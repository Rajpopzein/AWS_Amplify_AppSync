const { graphql, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = require("graphql");
var _= require("lodash");

//dummy data
var userdata = [
    {id:"1", name:"boomer_head",age:24, profession:"AWS Developer"},
    {id:"2", name:"boomer_cheef", age:24, profession:"Software Tester"},
    {id:"3", name:"boomer", age:22, profession:"Full Stack Developer"},
    {id:"4", name:"boomer2", age:20, profession:"Cloud Engineer"}

]

//dummy data 2
var hobbydata = [
    {id:"1",title:'programming',description:"writting this that can be done by the computer",userId:"1"},
    {id:"2",title:'Bike-Rider',description:"writting this that can be done by the computer",userId:"2"},
    {id:"3",title:'Reading books',description:"writting this that can be done by the computer",userId:"4"},
    {id:"4",title:'Hearing Audiobook',description:"writting this that can be done by the computer",userId:"2"}
]

// dummy data 3
var postdata = [
    { id:"1", command:"Nice"},
    { id:"2", command:"Best"},
    { id:"3", command:"Wow"},
    { id:"4", command:"Great"}

]




//create type
const userType = new GraphQLObjectType(
    {
        name: 'User',
        description:'Documentation for user....',
        fields:()=>({
            id:{type:GraphQLID},
            name:{type:GraphQLString},
            age:{type:GraphQLInt},
            profession:{type:GraphQLString}
        })
    }
)

const HobbyType = new GraphQLObjectType(
    {
        name: 'Hobby',
        description : 'Hobby discription',
        fields:()=>({
            id:{type:GraphQLID},
            title:{type:GraphQLString},
            description:{type:GraphQLString},
            user:{
                type:userType,
                resolve(parent,args){
                    return _.find(userdata,{id:parent.userId})
                }
            }
            
        })
    }
)

const postType = new GraphQLObjectType(
    {
        name :"post",
        description:"Post Discription",
        fields:()=>({
            id:{type:GraphQLID},
            command:{type:GraphQLString},
            //Will get user data
            users:{
                type:userType,
                resolve(parent,args)
                {
                    return _.find(userdata,{id:parent.userId})
                }
            }
        })
    }
)


//rootquery
const rootquery = new GraphQLObjectType({
    name:'RootQuery',
    description:'Description',
    fields:{
        user: {
            type:userType,HobbyType,
            //Argument need to getting data 
            args:{
                id:{type:GraphQLString}
            },

            resolve(parent,args)
            {
                
                return _.find(userdata,{id:args.id}) 
                //where we get data from api or frontend
                //we resolve with data
                //get and return data from data source
            }
        },

        hobby:{
            type:HobbyType,
            args:{
                id:{type:GraphQLID}
            },

            resolve(parent,args)
            {
                return _.find(hobbydata,{id:args.id})
                //returning hobby
            }
        },

        post:{
            type:postType,
            args:{
                id:{type:GraphQLID}
            },

            resolve(parent,args)
            {
                return _.find(postdata,{id:args.id})
                //return post datas
            }
        }
    }
})


//exporting GraphQlSchema with root query
module.exports = new GraphQLSchema({
    query:rootquery
})
