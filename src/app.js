const mongoose=require("mongoose");
const validator=require("validator")
//conection creation and creating a new db

mongoose.connect("mongodb://localhost:27017/Rahul1",{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true})
.then(()=>console.log("Connections created successfully.."))
.catch((err)=>console.log(err))


//schema
//A schema defines the structure of a document,default values,validatiors, etc

const playListSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:[2,"minimum word of 2 letters"],
        maxlength:30
    },
    ctype:{
        type:String,
        required:true,
        lowercase:true,
        enum:["frontend","backend","database"]
    },
    videos:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Count must be positive")
            }
        }
    
    // validate:{
    //     validator:function(value){
    //         return value.length < 0

    //     },
    //     message:"Count must be positive"
    // }
},
    author:String,
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})


//A mongoose Model is a wrapper on the  mongoose schema 
//A mongoose schema defines the structure of a document,default values,validatiors, etc,whereas a monggose model
//provides a interface to the database for creating ,updating,querying,deleting records etc.


//collection creation
const Playlist=new mongoose.model("Playlist",playListSchema)//class

//create or insert document

//adding just one document
// const createDocument=async()=>{
//     try{
//         const reactPlaylist=new Playlist({
//             name:"React Js",
//             ctype:"Front End",
//             videos:80,
//             auuthor:"Youtube",
//             active:true
//         })
//         const result=await reactPlaylist.save();
//         console.log(result);
//     }catch(err){
//         console.log(err)
//     }
    
// }
 const createDocument=async()=>{
        try{
            const reactPlaylist=new Playlist({
                name:"    MongOose Js",
                ctype:"Database",
                videos:70,
                auuthor:"Youtube",
                email:"rahul.g@Com",
                active:true
            })
            const result=await reactPlaylist.save();
            console.log(result);
        }catch(err){
            console.log(err)
        }
        
    }

createDocument();

//Adding multiple documents

// const createDocument=async()=>{
//     try{
//         const jsPlaylist=new Playlist({
//             name:"Javascript",
//             ctype:"Front End",
//             videos:180,
//             auuthor:"Youtube",
//             active:true
//         })
//         const mongoPlaylist=new Playlist({
//             name:"MongoDb",
//             ctype:"Database",
//             videos:10,
//             auuthor:"Youtube",
//             active:true
//         })
//         const mongoosePlaylist=new Playlist({
//             name:"Mongoose",
//             ctype:"Database",
//             videos:4,
//             auuthor:"Youtube",
//             active:true
//         })
//         const result=await Playlist.insertMany([jsPlaylist,mongoosePlaylist,mongoPlaylist]);
//         console.log(result);
//     }catch(err){
//         console.log(err)
//     }
    
// }

// createDocument();


//read or querying documents
// const getDocument=async ()=>{
//     try{
//         const result=await Playlist.find({ctype:"Front End"}).select({name:1}).limit(1);
//         console.log(result)

//     }catch(err){
//         console.log(err)
//     }
   
// }

// getDocument()

//comparison querying operators
// const getDocument=async ()=>{
//     try{
//         // const result=await Playlist.find({videos:80}).select({name:1});
//         // const result=await Playlist.find({videos:{$gt:50}}).select({name:1});
//         // const result=await Playlist.find({videos:{$lt:50}}).select({name:1});
//         const result=await Playlist.find({ctype:{$in:["Front End","Database"]}}).select({name:1});
//         console.log(result)

//     }catch(err){
//         console.log(err)
//     }
   
// }
// getDocument()


//logical operators

// const getDocument=async ()=>{
//     try{
//         // const result=await Playlist.find({$or:[{ctype:"Front End"},{author:"youtube"}]}).select({name:1});
//         const result=await Playlist.find({$and:[{ctype:"Front End"},{author:"youtube"}]}).select({name:1});
//         console.log(result)

//     }catch(err){
//         console.log(err)
//     }
   
// }
// getDocument()

//sorting snd count

// const getDocument=async ()=>{
//     try{
//         // const result=await Playlist.find({ctype:{$in:["Front End","Database"]}}).select({name:1})
//         // .countDocuments();
//         const result=await Playlist.find({ctype:{$in:["Front End","Database"]}}).select({name:1})
//         // .sort({name:1});
//         .sort({name:-1});
//         console.log(result)

//     }catch(err){
//         console.log(err)
//     }
   
// }
// getDocument()

//update document

// const updateDocument=async (_id)=>{
//     try{
//         const result=await Playlist.findByIdAndUpdate({_id},{//-->_id:_id-->_id if key value pair is sameES6
//             $set:{
//                 name:"Javascript (Js)"
//             }
//         },{
//             new:true,             // by writing this option we will see the updated result otherwise we will see the
//             useFindAndModify:false //old value 
//         });
//         console.log(result)
//     }catch(err){
//         console.log(err)
//     }
// }
// updateDocument("6086b0e643c0fe3518f8e642")


//delete document

const deleteDocument=async(id)=>{
    try{
        const result=await Playlist.findByIdAndDelete({_id:id});
    console.log(result)
    }catch(err){
        console.log(err)
    }
   
}

// deleteDocument("6086c7e22ed24219e4272222")

//built in validation
//lowercase,uppercase,trim etc