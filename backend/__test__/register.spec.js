const { registerUser } = require("../handlers/register");


const mockResponse ={
  status:jest.fn(),
  json:jest.fn(()=> mockResponse),
  
};

describe('/',()=>{
  const mockRequest ={
    body:{
      username :"Rukshan",
      password :1234
    }
     
  };
  it('should get user by name and password',()=>{
     registerUser(mockRequest,mockResponse);
  })
  it('should return of 400 when there are errors', ()=>{

  })

});