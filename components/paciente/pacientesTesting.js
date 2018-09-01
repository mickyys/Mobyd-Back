var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

var Paciente = require('./paciente');

describe('getPaciente', function() {
  it('debe retornar un estado 200', function(done) {
       var paciente  = new Paciente();
       paciente.validate((err)=>{
            expect(err.errors.name).to.exist;
            done();
       });   
  });
});