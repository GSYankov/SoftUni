const Calculator = require("./Calculator");

const expect = require("chai").expect;
const assert = require('chai').assert;

describe('Calculator', function () {
    let calculator;

    beforeEach(function () {
        calculator = new Calculator();
    });

    it('Contains property expenses that is initialised to an empty array', function () {
        assert.isArray(calculator.expenses);
        assert.isEmpty(calculator.expenses);
    });

    describe('Function toString()', function () {
        it('Function add stores values of any type', function () {
            calculator.add(10);
            calculator.add('Pesho');
            calculator.add([1, 2, 3]);

            assert.equal(calculator.toString(), '10 -> Pesho -> 1,2,3');
        });

        it('Function returns particular string if expenses is empty',function () {
            assert.equal(calculator.toString(),'empty array');
        })
    });

    describe('Function divideNums', function () {
        it('Function divides only the numbers', function () {
            calculator.add(10);
            calculator.add('Ivan');
            calculator.add(2);

            assert.equal(calculator.divideNums(), 5)
        });

        it('division with floats', function() {
            calculator.add(10.5);
            calculator.add(2);

            assert.closeTo(calculator.divideNums(), 5.25, 0.01);
        });

        it('division with zero', function() {
            calculator.add(10.5);
            calculator.add(0);

            assert.equal(calculator.divideNums(), 'Cannot divide by zero');
        });

        it('Function returns a patricular message if no numbers found', function () {
            calculator.add('Gancho');
            calculator.add('Mancho');

            assert.throw(() => calculator.divideNums(), 'There are no numbers in the array!')
        })
    });

    describe('Function orderBy returns ordered array', function () {
        it('should return ordered array of numbers', function () {
            calculator.add(4);
            calculator.add(1);
            calculator.add(3);
            calculator.add(2);

            assert.equal(calculator.orderBy(),'1, 2, 3, 4');
        });
    })
});


