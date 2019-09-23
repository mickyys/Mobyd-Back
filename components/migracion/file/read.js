'use strict';
const XLSX = require('xlsx');
const Tutor = require('../../tutor/tutor');
const Paciente = require('../../paciente/paciente');
const Raza = require('../../raza/raza');
const fs = require('fs');
const Historial = require('../../paciente/historial/historial');
const { Servicio } = require('../../servicios/servicios');
const version = 3;

// /**
//  * Read File clientes
//  */
// async function readFileTutor() {
//     const workbook = XLSX.readFile(`files/${version}/clientes.xlsx`);
//     const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
//     const start = new Date();
//     console.log(`start : ${start}`);
    
//     for (let i = 0; i < workSheet.length; i++){
//         const tutor = new Tutor({
//                 name: workSheet[i].NOMBRE,
//                 address: workSheet[i].DIRECCION,
//             phone: workSheet[i].TELEFONO,
//             commune: {
//                 "_id": 65,
//                 "descripcion": "San Antonio",
//                 "region_id": 6
//             },
//             location: workSheet[i].LOCALIDAD,
//             email: workSheet[i].EMAIL,
//             codeVetter : workSheet[i].CODIGO,
//             vip: 0,
//             userCreate: {
//                 name: 'Hector Martinez'
//             }
//         });

//         let result = await tutor.save();
//         getPatientsForTutor(workSheet[i].CODIGO, result._id)

//     }
    
//     console.log(`start : ${start}`);
//     console.log(`end : ${new Date()}`);
// }

// async function getPatientsForTutor(idTutor, idNew) {
//     const workbook = XLSX.readFile(`files/${version}/pacientes.xlsx`);
//     const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

//     let filter = workSheet.filter(obj => obj.CODIGO == idTutor);

//     for (let i = 0; i < filter.length; i++) {

//         let raza = await Raza.find({
//             raza: filter[i].RAZA
//         });
//         if (raza === null || raza === undefined || raza === '' || raza.length === 0) {
//             console.log("----------SIN RAZA---------------------");
//             console.log(filter[i].RAZA);
//             console.log("----------SIN RAZA---------------------");
//         }

//         let sexo = filter[i].SEXO === 'M' ? filter[i].SEXO : filter[i].SEXO === 'H' ? 'H' : 'H';
//         let dateJSON = XLSX.SSF.parse_date_code(filter[i].FECHA_NAC, {
//             date1904: false
//         });
//         let date = new Date(dateJSON.y, dateJSON.m - 1, dateJSON.d);

//         const paciente = new Paciente({
//             name: filter[i].NOMBRE,
//             birthDate: date,
//             race: raza[0],
//             sex: sexo,
//             species : filter[i].ESPECIE,
//             microchip: filter[i].MICROCHIP,
//             tutor: idNew,
//             death: filter[i].VIVE === 'True' ? 0 : 1,
//             codeVetter : filter[i].CODIGOPACI,
//             userCreate: {
//                 name: 'Migracion'
//             }

//         });

//         let result = await paciente.save();    
//         readClinicaFile(filter[i].CODIGOPACI, result._id);
//     }
// }

// async function readClinicaFile(idPatient, idMongoPaciente){
//     const workbook = XLSX.readFile(`files/${version}/clinica.xlsx`);
//     const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

//     let filter = workSheet.filter(obj => obj.CODIGOPACI == idPatient);

//     filter.forEach(obj =>{
//         let objSplit = obj.DESCRIP.split('******');
//         objSplit.forEach(async elem => {
// 0                let historial = new Historial({
//                     patient: idMongoPaciente,
//                     description: elem        
//                 });
        
//                 let result = await historial.save();                    
//             });                
//         });    
// }


async function readServicios(){
    const workbook = XLSX.readFile(`files/Servicios.xlsx`);
    const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Hoja1);
   
     workSheet.forEach(async obj => 
        {
            if(obj.Precio > 0 && obj.Precio != null && obj.Precio != undefined){            
                const servicio = new Servicio({ 
                    description : obj.Servicio,
                    price : obj.Precio,
                    userCreate : { name : 'hmartinez' }
                });
                const result = await servicio.save();                              
            }                  
        }        
    );
}

// readServicios();