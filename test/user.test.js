require('co-mocha');

var app = require('../app').default;

var request = require('co-supertest').agent(app.listen());
var should = require('chai').should();

it('add one user', function* () {
	let res =yield request.post('/users')
	.send({"staffId":"123123","openId":"22222","password":"2222"})
	.set("Content-Type","application/json")
	.expect('Content-Type', /json/)
	.expect(200)
	.end();


	let body = JSON.parse(res.text);

	return"";

})