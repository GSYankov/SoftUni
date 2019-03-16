const HolidayPackage = require('./HolidayPackage');

const assert = require('chai').assert;

describe('HolidayPackage', function () {
    let holidayPackage;

    beforeEach(function () {
        holidayPackage = new HolidayPackage('Sofia', 'Winter');
    });

    describe('Constructor', function () {
        it('Constructor takes destination and season ', function () {
            assert.equal(holidayPackage.destination, 'Sofia');
            assert.equal(holidayPackage.season, 'Winter');
        });
    });

    describe('Accessor insuranceIncluded', function () {
        it('Insurance parameter must be boolean', function () {
            assert.throw(() => holidayPackage.insuranceIncluded = 'string', 'Insurance status must be a boolean');
        });

        it('Insurance parameter works properly with boolean', function () {
            holidayPackage.insuranceIncluded = true
            assert.equal(holidayPackage.insuranceIncluded, true);
        });
    });

    describe('Function showVacationers', function () {
        it('If no vacationers returns particular message', function () {
            assert.equal(holidayPackage.showVacationers(), 'No vacationers are added yet');
        });

        it('Returns correct string with vacationers', function () {
            holidayPackage.addVacationer('Manol Ganchev');
            holidayPackage.addVacationer('Doncho Manchev');

            assert.equal(holidayPackage.showVacationers(), 'Vacationers:\nManol Ganchev\nDoncho Manchev')
        });
    });

    describe('Function addVacationer', function () {
        it('Throws an error if name is not correct', function () {
            assert.throw(() => holidayPackage.addVacationer(''), 'Name must consist of first name and last name')
        });

        it('Throws an error if name is not string', function () {
            assert.throw(() => holidayPackage.addVacationer(234), 'Vacationer name must be a non-empty string')
        });

        it('Throws an error if name is empty string', function () {
            assert.throw(() => holidayPackage.addVacationer(' '), 'Vacationer name must be a non-empty string')
        });
    });

    describe('Function generateHolidayPackage', function () {
        it('If no vacationer throws an error', function () {
            assert.throw(() => holidayPackage.generateHolidayPackage(), 'There must be at least 1 vacationer added');
        });

        it('Returns correct string with vacationers 1', function () {
            holidayPackage.addVacationer('Manol Ganchev');
            holidayPackage.addVacationer('Doncho Manchev');

            assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Sofia\nVacationers:\nManol Ganchev\nDoncho Manchev\nPrice: 1000');
        });

        it('Returns correct string with vacationers 2', function () {
            holidayPackage.addVacationer('Manol Ganchev');
            holidayPackage.addVacationer('Doncho Manchev');
            holidayPackage.insuranceIncluded = true;

            assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Sofia\nVacationers:\nManol Ganchev\nDoncho Manchev\nPrice: 1100');
        });

        it('Returns correct string with vacationers 3', function () {
            holidayPackage.addVacationer('Manol Ganchev');
            holidayPackage.addVacationer('Doncho Manchev');
            holidayPackage.season="Summer";
            holidayPackage.insuranceIncluded = true;

            assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Sofia\nVacationers:\nManol Ganchev\nDoncho Manchev\nPrice: 1100');
        });

        it('Returns correct string with vacationers 4', function () {
            holidayPackage.addVacationer('Manol Ganchev');
            holidayPackage.addVacationer('Doncho Manchev');
            holidayPackage.season="Spring";
            holidayPackage.insuranceIncluded = true;

            assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Sofia\nVacationers:\nManol Ganchev\nDoncho Manchev\nPrice: 900');
        });

        it('Returns correct string with vacationers 4', function () {
            holidayPackage.addVacationer('Manol Ganchev');
            holidayPackage.addVacationer('Doncho Manchev');
            holidayPackage.season="Autumn";
            holidayPackage.insuranceIncluded = true;

            assert.equal(holidayPackage.generateHolidayPackage(), 'Holiday Package Generated\nDestination: Sofia\nVacationers:\nManol Ganchev\nDoncho Manchev\nPrice: 900');
        });

    });
});