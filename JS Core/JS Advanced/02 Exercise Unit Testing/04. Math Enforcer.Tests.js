let mathEnforcer = require('./04. Math Enforcer');
let expect = require('chai').expect;

describe('mathEnforcer', function () {
    describe('addFive', function () {
        it('with a non-number, should return correct result', function () {
            let num = '4';
            let expected = mathEnforcer.addFive(num);
            expect(expected).to.be.equal(undefined);
        });

        it('with a number, should return correct result', function () {
            let num = 5;
            let expected = mathEnforcer.addFive(num);
            expect(expected).to.be.equal(10);
        });

        it('with a negative, should return correct result', function () {
            let num = -7;
            let expected = mathEnforcer.addFive(num);
            expect(expected).to.be.equal(-2);
        });

        it('with a negative, floating point number, should return correct result', function () {
            let num = -7.25;
            let expected = mathEnforcer.addFive(num);
            expect(expected).to.be.equal(-2.25);
        });
    });

    describe('subtractTen', function () {
        it('with a non number parameter, should return correct result', function () {
            let num = '4';
            let expected = mathEnforcer.subtractTen(num);
            expect(expected).to.be.equal(undefined);
        });

        it('with a number, should return correct result', function () {
            let num = 5;
            let expected = mathEnforcer.subtractTen(num);
            expect(expected).to.be.equal(-5);
        });

        it('with a negative, should return correct result', function () {
            let num = -7;
            let expected = mathEnforcer.subtractTen(num);
            expect(expected).to.be.equal(-17);
        });

        it('with a negative, floating point number, should return correct result', function () {
            let num = -7.25;
            let expected = mathEnforcer.subtractTen(num);
            expect(expected).to.be.equal(-17.25);
        });
    });

    describe('sum', function () {
        it('with a non-number parameter, should return correct result', function () {
            let num1 = '4';
            let num2 = '5';
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(undefined);
        });

        it('with numbers, should return correct result', function () {
            let num1 = 4;
            let num2 = 5;
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(9);
        });

        it('with the first number and second string, should return correct result', function () {
            let num1 = 4;
            let num2 = '5';
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(undefined);
        });

        it('with the second number and first string, should return correct result', function () {
            let num1 = '4';
            let num2 = 5;
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(undefined);
        });

        it('with negative numbers, should return correct result', function () {
            let num1 = -4;
            let num2 = -5;
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(-9);
        });

        it('with a negative number and a floating point one, should return correct result', function () {
            let num1 = -4.20;
            let num2 = -5;
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(-9.20);
        });

        it('with a negative number and a floating point one, should return correct result', function () {
            let num1 = -4;
            let num2 = -5.20;
            let expected = mathEnforcer.sum(num1, num2);
            expect(expected).to.be.equal(-9.20);
        })
    })
});