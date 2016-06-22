var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
      
var empresaSchema = new Schema({
    nome : { 
        type: String, 
        required: true, 
        trim: true,
        index: { unique: true } 
    }, 
    cnpj: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    descricao: {
        type: String,
        required: false
    },
    classificacao: {
        type: Number,
        required: true,
        index: { unique: false }
    },
    classificacao_interna: {
        type: Number,
        required: true,
        index: { unique: false }
    },
    telefone: {
        type: [String]
    },
    email: {
        type: [String]
    },
    rede_social: {
        type: [String]
    },
    endereco: {
        type: String,
        required: true
    },
    atividade: {
        type: Number,
        required: false,
        index: { unique: false }
    },
    uri_foto: {
        type: String,
        required: false,
    },
    uri_foto_secundaria: {
        type: [String]
    },
    descricao_servico: {
        type: String
    },
    tag: {
        type: [String],
        required: false
    },
    loc: {
        type: [Number],
        index: '2d'
    },
    date_created : { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});
      
var empresa = mongoose.model('empresa', empresaSchema);
      
module.exports = empresa;