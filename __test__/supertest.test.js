const request = require('supertest');
const app = require('../app');

describe("",()=>{
    // const expevtedurl = 
    it("",async()=>{
    const response = await request(app).get('/api/shorturl/new/YuydDfrxC');
    expect(response.status).toBe(302)
    expect(response.header.location).toEqual("https://www.pirateproxy-bay.com/");
    }) 
})
describe("post method ",()=>{
    it("its was posted before",async()=>{
    const response = await request(app).post('/api/shorturl/new/').type('form').send({url:"https://www.pirateproxy-bay.com/"});
    expect(response.status).toBe(200);
    expect(response.text).toEqual("http://localhost:3000/api/shorturl/new/YuydDfrxC");
    }) 
    it("its  posted at the first time",async()=>{
    const response = await request(app).post('/api/shorturl/new/').type('form').send({url:"https://www.pirateproxy-bay.com/"});
    expect(response.status).toBe(200);
    expect(response.text).toEqual("http://localhost:3000/api/shorturl/new/YuydDfrxC");
    }) 
})