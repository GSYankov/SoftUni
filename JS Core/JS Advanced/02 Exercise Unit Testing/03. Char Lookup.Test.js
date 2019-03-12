let lookupChar = require('./03. Char Lookup');
let expect = require("chai").expect;

describe('Lookup Char', function () {
    it("should return undefined if we pass number and string", function () {
        let str = "Some string";
        let num = 23;
        let expected = lookupChar(num, str);
        expect(expected).to.be.equal(undefined);
    });

    it("should return character if we pass string and number", function () {
        let str = 1;
        let num = "2";
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal(undefined);
    });

    it("should return character if we pass string and index", function () {
        let str = "Some string";
        let num = 2;
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal("m");
    });

    it("should return 'Incorrect index' if we pass an index out of array", function () {
        let str = "Some string";
        let num = 23;
        let expected = lookupChar(num, str);
        expect(expected).to.be.equal(undefined);
    });

    it("should return undefined if we pass number and string", function () {
        let str = "Some string";
        let num = -10;
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal("Incorrect index");
    });

    it("should return undefined if we pass string and floating point number", function () {
        let str = "Some string";
        let num = 2.33;
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal(undefined);
    });

    it("should return undefined if we pass two strings", function () {
        let str = "Some string";
        let num = "2.33";
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal(undefined);
    });

    it("should return undefined if we pass two numbers", function () {
        let str = 3;
        let num = 2;
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal(undefined);
    });

    it("should return undefined if we pass two numbers", function () {
        let str = 3;
        let num = -2.23;
        let expected = lookupChar(str, num);
        expect(expected).to.be.equal(undefined);
    });
});