var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
      
var feedbackSchema = new Schema({
    usuario : { 
        type: String, 
        required: true, 
        trim: true 
    }, 
    mensagem: {
        type: String,
        required: true,
        trim: true
    },
    rating : { 
        type: Number, 
        required: true,
        min: 0,
        max: 5
    }, 
    empresa: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    date_created : { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});
      
var feedback = mongoose.model('workout', feedbackSchema);
      
module.exports = feedback;