'use strict';
const XLSX = require('xlsx');
const Tutor = require('../../tutor/tutor');
const Paciente = require('../../paciente/paciente');
const Raza = require('../../raza/raza');
const moment = require('moment');
async function readFileTutor() {
    const workbook = XLSX.readFile('files/clientes.xlsx');
    const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
  
    for (let i = 0; i < workSheet.length; i++) {     
        /**
         * rutDV: String,
        name : String,
        lastName : String,
        address : String,
        phone : String,
        birthDate : Date,
        location : String,
        commune :  { type: Mongoose.Schema.Types.Mixed, ref: 'comuna'},
        communeId : Number, // { type: Mongoose.Schema.Types.ObjectId, ref: 'comuna' },
        email : String,
        photo : String,
        vip : Number,
        userCreate : {},
        userModify : {},
        dateCreate : {type: Date, default: Date.now},
        dateModify : {type: Date},
        status : { type : Number, default: 1} 
         */
        const tutor = new Tutor({
            name : workSheet[i].NOMBRE,
            address : workSheet[i].DIRECCION,
            phone : workSheet[i].TELEFONO,
            commune : {"_id": 65,"descripcion": "San Antonio", "region_id": 6},
            location : workSheet[i].LOCALIDAD,
            email : workSheet[i].EMAIL,
            vip : 0,
            userCreate : { name : 'Hector Martinez'}
        });
        
        let result = await tutor.save();        
        console.log("tutor - " + i);
        getPatientsForTutor(workSheet[i].CODIGO, result._id)
        
    }    
}

async function getPatientsForTutor(idTutor, idNew){
    const workbook = XLSX.readFile('files/pacientes.xlsx');
    const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

    let filter =  workSheet.filter(obj => obj.CODIGO == idTutor); 
    
    /**
     * name : { type : String, require : true},
    species : String,
    speciesType : Number,
    birthDate : Date,
    race :  { type: Mongoose.Schema.Types.Mixed, ref: 'razas'},
    sex : String,
    microchip : Number,
    photo : String,
    tutor : { type: Mongoose.Schema.Types.ObjectId, ref: 'tutors' },
    observations : String,
    death : Number,
    userCreate : String,
    userModify : String,
    dateCreate : {type: Date, default: Date.now},
    dateModify : {type: Date, default: Date.now},
    status : {
      type : Number,
      default : 1
    }  
     */

    for (let i = 0; i < filter.length; i++) {            
       
        let raza = await Raza.find({raza : filter[i].RAZA});
        console.log("paciente - " + i);
        if(raza === null || raza === undefined || raza === '' || raza.length === 0){
            console.log("----------SIN RAZA---------------------");
            console.log(filter[i].RAZA);
            console.log("----------SIN RAZA---------------------");
        }

        let sexo =  filter[i].SEXO === 'M' ? filter[i].SEXO : filter[i].SEXO === 'H' ? 'F' : null;
        let dateJSON = XLSX.SSF.parse_date_code(filter[i].FECHA_NAC, {date1904:false});
        let date = new Date(dateJSON.y, dateJSON.m -1 , dateJSON.d);

        const paciente = new Paciente({
            name : filter[i].NOMBRE,
            birthDate : date,
            race : raza[0],
            sex : sexo,
            microchip : filter[i].MICROCHIP,
            tutor : idNew,
            death : filter[i].MICROCHIP === 'True' ? 0 : 1,
            userCreate : { name : 'Hector Martinez'}

        });

        let result = await paciente.save();        

        console.log(result);
    }
}

readFileTutor();