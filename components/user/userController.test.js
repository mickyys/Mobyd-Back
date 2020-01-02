const userController = require('./userController');

const name = 'Hector';
const mail = 'hamp.martinez@gmail.com';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSGVjdG9yIiwibWFpbCI6ImhhbXAubWFydGluZXpAZ21haWwuY29tIiwiaWF0IjoxNTc3OTMxNzA5LCJleHAiOjE1Nzg1MzY1MDl9._L2-oVnbSezyIjiIQUfRG6NA07t5CtSYkwSFn0nmAAQ';

describe('validar userController', () => {
    
    beforeAll(() => {
        console.log("inicio de test");
    });

    test('generar token usuario correo registro', async () => {
        let token = await userController.mailNewUser(name, mail).token;       
        expect(token).not.toBe(null);
    });

    test('validar token usuario correo registro', async () => {
        let result = await userController.mailNewUserValid(token);
        expect(result.name).toEqual(name);
        expect(result.mail).toEqual(mail);
    });
});