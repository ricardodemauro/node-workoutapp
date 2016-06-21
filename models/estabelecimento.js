var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
      
var estabelecimentoSchema = new Schema({
    nome : { 
        type: String, 
        required: true, 
        trim: true,
        index: { unique: true } 
    }, 
    descricao: {
        type: String,
        required: false
    },
    tag: {
        type: [String],
        required: false
    },
    loc: {
        type: [Number],
        index: '2d'
    }
});
      
var estabelecimento = mongoose.model('estabelecimento', estabelecimentoSchema);
      
module.exports = {
  Estabelecimento: estabelecimento
};