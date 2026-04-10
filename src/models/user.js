const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique: true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl :  {
        type : String,
    },
    about : {
        type : String,
        default : "Hello kese ho"
    }, 
skills : {
    type : [String],
}
},
{
    timestamps : true,
}

);

module.exports = mongoose.model("User",userSchema);