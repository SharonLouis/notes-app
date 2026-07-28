import mongoose from 'mongoose';
//create a schema for the note model
// model based on the schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
{timestamps: true}//createdat , updatedat
);

const Note = mongoose.model('Note', noteSchema);
export default Note;
 