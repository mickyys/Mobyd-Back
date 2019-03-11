'use strict';
const XLSX = require('xlsx');
const Tutor = require('../../tutor/tutor');
const Paciente = require('../../paciente/paciente');
const Raza = require('../../raza/raza');
const fs = require('fs');
const Historial = require('../../paciente/historial/historial');


/**
 * Read File clientes
 */
async function readFileTutor() {
    const workbook = XLSX.readFile('files/2/clientes.xlsx');
    const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);
    const start = new Date();
    console.log(`start : ${start}`);
    
    for (let i = 0; i < workSheet.length; i++){
        const tutor = new Tutor({
                name: workSheet[i].NOMBRE,
                address: workSheet[i].DIRECCION,
            phone: workSheet[i].TELEFONO,
            commune: {
                "_id": 65,
                "descripcion": "San Antonio",
                "region_id": 6
            },
            location: workSheet[i].LOCALIDAD,
            email: workSheet[i].EMAIL,
            vip: 0,
            userCreate: {
                name: 'Hector Martinez'
            }
        });

        let result = await tutor.save();
        getPatientsForTutor(workSheet[i].CODIGO, result._id)

    }
    
    console.log(`start : ${start}`);
    console.log(`end : ${new Date()}`);
}

async function getPatientsForTutor(idTutor, idNew) {
    const workbook = XLSX.readFile('files/2/pacientes.xlsx');
    const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

    let filter = workSheet.filter(obj => obj.CODIGO == idTutor);

    for (let i = 0; i < filter.length; i++) {

        let raza = await Raza.find({
            raza: filter[i].RAZA
        });
        if (raza === null || raza === undefined || raza === '' || raza.length === 0) {
            console.log("----------SIN RAZA---------------------");
            console.log(filter[i].RAZA);
            console.log("----------SIN RAZA---------------------");
        }

        let sexo = filter[i].SEXO === 'M' ? filter[i].SEXO : filter[i].SEXO === 'M' ? 'H' : null;
        let dateJSON = XLSX.SSF.parse_date_code(filter[i].FECHA_NAC, {
            date1904: false
        });
        let date = new Date(dateJSON.y, dateJSON.m - 1, dateJSON.d);

        const paciente = new Paciente({
            name: filter[i].NOMBRE,
            birthDate: date,
            race: raza[0],
            sex: sexo,
            microchip: filter[i].MICROCHIP,
            tutor: idNew,
            death: filter[i].VIVE === 'True' ? 0 : 1,
            userCreate: {
                name: 'Migracion'
            }

        });

        let result = await paciente.save();    
        readClinicaFile(filter[i].CODIGOPACI, result._id);
    }
}

async function readClinicaFile(idPatient, idMongoPaciente){
    const workbook = XLSX.readFile('files/2/clinica.xlsx');
    const workSheet = XLSX.utils.sheet_to_json(workbook.Sheets.Sheet1);

    let filter = workSheet.filter(obj => obj.CODIGOPACI == idPatient);

    filter.forEach(obj =>{
        let objSplit = obj.DESCRIP.split('******');
        objSplit.forEach(async elem => {
                let historial = new Historial({
                    patient: idMongoPaciente,
                    description: elem        
                });
        
                let result = await historial.save();                    
            });                
        });    
}


// async function readFileBD(idPatient, idMongoPaciente) {
//     let pathClientes = 'files/clinica.htm';
//     let data = [];

//     await fs.readFile(pathClientes, 'UTF-8', (err, contents) => {
//         let content = contents.split('<tr>');

//         content.forEach(async element => {
//             // let contentTd = element.trim().replace(/<(.|\n)*?>/g, '').split('\r\n');
//             let contentTd = element.trim().split('\r\n');
//             let valueJSON = {
//                 'id': contentTd[0].replace('<td>','').replace('</td>',''),
//                 'descripcion': contentTd[1].replace('<td>','').replace('</td>','')
//             }
//             data.push(valueJSON);
            
            
//         });
//         let historial = data.filter(obj => obj.id === idPatient);

//         historial.forEach(async obj =>{
//             let objSplit = obj.descripcion.split('******');   

            
//             objSplit.forEach(async elem => {               
//                 if(elem !== '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'){
//                     let historial = new Historial({
//                         patient: idMongoPaciente,
//                         description: elem        
//                     });
            
//                     let result = await historial.save();                    
//                 }                
//             });
//         });               
//     });

    
    
// }

readFileTutor();
