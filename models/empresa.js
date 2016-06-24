var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var telefoneSchema = {
    ddi: {
        type: Number
    },
    ddd: {
        type: Number
    },
    numero: {
        type: Number,
        required: true,
        index: { unique: false }
    }
};

var enderecoSchema = {
    rua: {
        type: 'string',
        required: true
    },
    numero: {
        type: 'string'
    },
    bairro: {
        type: 'string'
    },
    cidade: {
        type: 'string'
    },
    estado: {
        type: 'string'
    },
    pais: {
        type: 'string'
    }
};

var empresaSchema = new Schema({
    nome_fantasia : { 
        type: 'string', 
        required: true, 
        maxlength: 50,
        minlength: 3,
        trim: true,
        index: { unique: true },
    }, 
    cnpj: {
        type: 'number'
    },
    classificacao: {
        type: 'number'
    },
    classificacao_interna: {
        type: 'number'
    },
    telefone: {
        type: [telefoneSchema]
    },
    email: {
        type: ['string']
    },
    rede_social: {
        type: ['string']
    },
    endereco: {
        type: enderecoSchema
    },
    atividade: {
        type: 'number'
    },
    uri_foto: {
        type: 'string'
    },
    uri_foto_secundaria: {
        type: ['string']
    },
    descricao_servico: {
        type: 'string'
    },
    tag: {
        type: ['string']
    },
    loc: {
        type: ['number'],
        index: '2d'
    },
    date_created : { 
        type: 'date', 
        required: true, 
        default: Date.now 
    }
});
      
var empresa = mongoose.model('empresa', empresaSchema);
      
module.exports = empresa;