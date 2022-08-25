const { assert } = require("chai");
const { it } = require("mocha")
//Controllers
const usersControllers = require('../users.controllers');

describe('Test unitario de mis usuarios', () => {
  it('Should return new user when I sent correct data', (done) => {
    const body = {
      first_name: 'Usuario de test',
      last_name: 'Tester',
      email: 'email@email.com',
      password: '12345',
      phone: '1234567890',
      birthday_date: '22/10/2020',
      country: 'mexico'
    }
    const data = usersControllers.createUser(body);
    assert.equal(data.first_name,body.first_name);
    assert.equal(data.rol,'normal');
    assert.notEqual(data.password,body.password);
    done();
  })

  it('Should return the user  when I sent a correct ID',(done)=>{
    const data  = usersControllers.getUserById('d9dbc589-36ff-4773-a77f-f0112834d7f4');
    assert.property(data,'id');
    assert.property(data,'email');
    assert.property(data,'rol');
    assert.property(data,'first_name');
    assert.property(data,'last_name');
    assert.equal(data.rol,'admin');
    assert.equal(data.email,'luis@correo.com');
    assert.equal(data.first_name,'luis');
    assert.property(data,'active');
    assert.equal(data.active,true);
    assert.typeOf(data.active,'boolean');

    done();
  })

  it('Should return the user  when I sent an invalid ID',(done)=>{
    const data  = usersControllers.getUserById('1');
    
    assert.typeOf(data,'boolean');
    assert.equal(data,false);

    done();
  })
})


// const sum = (a,b) => {
//   return a+b;
// }
// de scribe('Test unitario de mis usuarios',()=>{
//   it('Deberia retornar 8',()=>{
//       const miFuncionEjecutada =sum(6,2);
//       assert.equal(miFuncionEjecutada,8,'Ups no es un 8');
//   })
//   it('Deberia retornar 25',()=>{
//     const miFuncionEjecutada =sum(10,15);
//     assert.equal(miFuncionEjecutada,25,'Ups no es un 25');
// })
// })

