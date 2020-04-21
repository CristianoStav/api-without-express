const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../src/index');

chai.use(chaiHttp);

describe('Test routes', () => {
    describe('Test GET route', () => {
        it('success GET from: GRU to: CDG', (done) => {
            const response = { route: 'GRU,BRC,SCL,ORL,CDG', price: 40 }
            chai.request(server).get('/quote/GRU/CDG')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    chai.expect(res.body).to.be.eql(response);
                    done();
                });
        });
        it('success GET from: GRU to: SCL', (done) => {
            const response = { route: 'GRU,BRC,SCL', price: 15 }
            chai.request(server).get('/quote/GRU/SCL')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    chai.expect(res.body).to.be.eql(response);
                    done();
                });
        });
        it('return message: "Route not found."', (done) => {
            const response = { message: 'Route not found.' };
            chai.request(server).get('/quote/GRU/ASC')
                .end((err, res) => {
                    chai.expect(res.body).to.be.eql(response);
                    done();
                });
        });
    });

    describe('Test POST route', () => {
        it('success POST', (done) => {
            const newRoute = { from: 'ORL', to: 'GRU', price: 50 };
            chai.request(server).post('/route')
                .send(newRoute)
                .end((err, res) => {
                    chai.expect(res.statusCode).to.be.equal(200);
                    done();
                });
        });
        it('return message: "Request not have body."', (done) => {
            chai.request(server).post('/route')
                .end((err, res) => {
                    const response = { message: 'Request not have body.' };
                    chai.expect(res.body).to.be.eql(response);
                    done();
                });
        });
    });
});
