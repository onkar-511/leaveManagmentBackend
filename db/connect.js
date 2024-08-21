const mongosee = require("mongoose")
const uri = "mongodb://localhost:27017/dbconnect";

const connectDB = () => {
    console.log('database connected')
    //mongodb+srv://malionkar201998:<password>@cluster0.wuwbvpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    // return mongosee.connect(process.env.MONGODB_URL)
    //                        mongodb+srv://malionkar201998:<password>@cluster0.wuwbvpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     return mongosee.connect("mongodb+srv://malionkar201998:tbcHHEHSPsqEBMLr@cluster0.wuwbvpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

module.exports = connectDB