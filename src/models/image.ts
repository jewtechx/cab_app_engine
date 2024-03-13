import { Schema, model } from "mongoose";

const imageSchema = new Schema({
    useId:{type:Schema.Types.ObjectId, required:true},
    filename:{type:String, required:true},
    path:{type:String,required:true}
})

const Image = model('images',imageSchema)
export default Image