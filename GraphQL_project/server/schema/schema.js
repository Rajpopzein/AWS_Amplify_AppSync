const { graphql, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLFloat } = require("graphql");
var _= require("lodash");

//dummy data
var userdata = [
    {id:"1", name:"boomer_head",age:24, profession:"AWS Developer"},
    {id:"2", name:"boomer_cheef", age:24, profession:"Software Tester"},
    {id:"3", name:"boomer1", age:22, profession:"Full Stack Developer"},
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
    { id:"1", commend:"Nice",userId:"1"},
    { id:"2", commend:"Best",userId:"2"},
    { id:"3", commend:"Wow",userId:"4"},
    { id:"4", commend:"Great",userId:"2"}

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
            profession:{type:GraphQLString},
            //In this part we will return a array of posts created by the users
            posts: {
                type : new GraphQLList(postType),
                resolve(parent,args)
                {
                    return _.filter(postdata,{userId:parent.id})
                }
            },

            hobbies:{
                type: new GraphQLList(HobbyType),
                resolve(parent,args){
                    return _.filter(hobbydata,{userId: parent.id})
                }
            }
                    
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
            commend:{type:GraphQLString},
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

        //view all users
        users:{
            type: new GraphQLList(userType),
                resolve(parent,args)
                {
                   return userdata
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
        //view all hobbies

        hobbies:{
            type:new GraphQLList(HobbyType),
            resolve(parent,args){
                return hobbydata
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
        },

        // return all the posts

        posts:
        {
            type:new GraphQLList(postType),
            resolve(parent,args){
                return postdata
            }
        }
    }
})


//mutations

const Mutauions = new GraphQLObjectType({
    name:'mutaion',
    fields:{
        createUser:{
            type:userType,
            args:{
                id:{type: GraphQLID},
                name:{type: GraphQLString},
                age:{type:GraphQLInt},
                profession:{type: GraphQLString}
            },
            resolve(parent,args){
                let user = {
                    id: args.id,
                    name:args.name,
                    age:args.age,
                    profession:args.profession
                }
                
                return user
            }
        },
       createPost:{
        type: postType,
        args:{
           id:{type:GraphQLID},
           commend:{type:GraphQLString},
           userId:{type:GraphQLID}
        },
        resolve(parent,args)
        {
            var post = {
                id: args.id,
                commend: args.commend,
                userId : args.userId
            }
            
            return post
        }
       },
       createHobby:{
        type:HobbyType,
        args:{
            id:{type:GraphQLID},
            title:{type:GraphQLString},
            description:{type:GraphQLString},
            userId:{type:GraphQLID}
        },
        resolve(parent,args){
            var hobby = {
                id : args.id,
                title: args.title,
                description: args.description,
                userId: args.userId
            }
            return hobby
        }
       }
    }
})

//exporting GraphQlSchema with root query
module.exports = new GraphQLSchema({
    query:rootquery,
    mutation: Mutauions
})
