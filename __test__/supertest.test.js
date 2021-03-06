const request = require('supertest');
const app = require('../app');
// importent!!!!!!
// befor run the test go to url-shortener/api/shorturl and change in the task.js the line 13 to 'const jsonFileName = "index2"' 


describe("get method",()=>{
    it("show statistic",async()=>{
        let expectedOutput = {
            "id": 0,
            "shorturlId": "http://localhost:3000/api/shorturl/new/y-CuJ_eZA",
            "redirectCount": 0,
            "creationDate": "2021-03-05 15:07:25"
        }
        const response = await request(app).get('/api/statistic/y-CuJ_eZA');
        expect(response.status).toBe(200)
        expect(response.body).toEqual(expectedOutput);
        }) 
    it("when get id that exists it redirect to the page that the id belong to",async()=>{
    const response = await request(app).get('/api/shorturl/new/y-CuJ_eZA');
    expect(response.status).toBe(302)
    expect(response.header.location).toEqual("https://www.youtube.com/watch?v=_8gHHBlbziw&t=1136s");
}) 
    it("when get id that does not exist it will send error",async()=>{
    const response = await request(app).get('/api/shorturl/new/fsdf45246426');
    expect(response.status).toBe(404);
    expect(response.text).toBe("the id is not exist");

    }) 
})
describe("post method ",()=>{
    it("its was posted before, the id that you get need to be the same",async()=>{
    const response = await request(app).post('/api/shorturl/new/').type('form').send({url:"https://www.youtube.com/watch?v=_8gHHBlbziw&t=1136s"});
    expect(response.status).toBe(200);
    expect(response.text).toEqual("http://localhost:3000/api/shorturl/new/y-CuJ_eZA");
    }) 
    it("its  posted at the first time",async()=>{
    const response1 = await request(app).post('/api/shorturl/new/').type('form').send({url:"https://www.pirateproxy-bay.com/"});
    const response2 = await request(app).post('/api/shorturl/new/').type('form').send({url:"https://jestjs.io/docs/en/expect#not"});
     startWith  = response1.text.startsWith("http://localhost:3000/api/shorturl/new/");
    expect(response1.status).toBe(200);
    expect(startWith).toBe(true);
    expect(response1.text).not.toBe(response2.text);
    }) 
    
})