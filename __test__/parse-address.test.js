import { parseAddress } from "../src/AddressParser.js";

//set up global values
const _delimiter = "*";
const _streetAddress1 = "1234 Main Street";
const _streetAddress2 = "P.O. Box 55";
const _city = "Anytown";
const _state = "NC";
const _postalCode = "98765";
const _countryISO2 = "US";
const _countryISO3 = "USA";

describe("Address Parser", () => {
  describe("Full Address", () => {
    test("should parse full address", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _postalCode,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse full address in mixed order", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _city,
        _streetAddress2,
        _postalCode,
        _state,
        _countryISO2,
        _streetAddress1,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse full address in mixed state case", () => {
      //arrange
      const stateVar = "nC";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        stateVar,
        _postalCode,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(stateVar);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse full address in mixed country case", () => {
      //arrange
      const countryVar = "Us";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _postalCode,
        countryVar,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(countryVar);
    });

    test("should parse full address with invalid state code", () => {
      //arrange
      const stateVar = "ZZ";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        stateVar,
        _postalCode,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe([_streetAddress1, stateVar].join(" ")); //invalid code should be appended to end on street address 1
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe("");
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse full address with ISO3 country code", () => {
      //arrange
      const countryVar = "AZE";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _postalCode,
        countryVar,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(countryVar);
    });

    test("should parse full address with invalid ISO2 country code", () => {
      //arrange
      const countryVar = "ZZ";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _postalCode,
        countryVar,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(
        [_streetAddress1, countryVar].join(" ")
      ); //invalid code should be appended to end on street address 1
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe("");
    });

    test("should parse full address with invalid ISO3 country code", () => {
      //arrange
      const countryVar = "ALG";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _postalCode,
        countryVar,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(
        [_streetAddress1, countryVar].join(" ")
      ); //invalid code should be appended to end on street address 1
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe("");
    });

    test("should parse full address with matching state and country codes", () => {
      const stateCountryVar = "AL";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        stateCountryVar,
        _postalCode,
        stateCountryVar,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(stateCountryVar);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(stateCountryVar);
    });

    test("should parse full address with long postal code", () => {
      //arrange
      const postalVar = _postalCode + "-1111";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        postalVar,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(postalVar);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse full address with invalid postal code", () => {
      //arrange
      const postalVar = "9876";
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        postalVar,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe([_streetAddress1, postalVar].join(" "));
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe("");
      expect(result.country).toBe(_countryISO2);
    });

    describe("Street Address 2 Variations", () => {
      test("should parse value of pobox 1234", () => {
        //arrange
        const poBoxVar = "pobox 1234";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          poBoxVar,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(poBoxVar);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of p.o.box 1234", () => {
        //arrange
        const poBoxVar = "p.o.box 1234";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          poBoxVar,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(poBoxVar);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of po box 1234", () => {
        //arrange
        const poBoxVar = "po box 1234";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          poBoxVar,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(poBoxVar);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of p.o.box 1234", () => {
        //arrange
        const poBoxVar = "p.o. box 1234";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          poBoxVar,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(poBoxVar);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of P.o. Box 1234", () => {
        //arrange
        const poBoxVar = "P.o. Box 1234";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          poBoxVar,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(poBoxVar);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });
      test("should parse value of apt 2", () => {
        //arrange
        const streetAddress2Var = "apt 2";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          streetAddress2Var,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(streetAddress2Var);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of apartment 2", () => {
        //arrange
        const streetAddress2Var = "apartment 2";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          streetAddress2Var,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(streetAddress2Var);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of suite 200", () => {
        //arrange
        const streetAddress2Var = "suite 200";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          streetAddress2Var,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(streetAddress2Var);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });

      test("should parse value of ste: 200", () => {
        //arrange
        const streetAddress2Var = "ste: 200";

        //build concatenated string for testing
        const testAddress = [
          _streetAddress1,
          streetAddress2Var,
          _city,
          _state,
          _postalCode,
          _countryISO2,
        ].join(_delimiter);

        //act
        const result = parseAddress(testAddress, _delimiter);
        expect(result).not.toBeNull();
        expect(result.streetAddress).toBe(_streetAddress1);
        expect(result.streetAddress2).toBe(streetAddress2Var);
        expect(result.city).toBe(_city);
        expect(result.state).toBe(_state);
        expect(result.postalCode).toBe(_postalCode);
        expect(result.country).toBe(_countryISO2);
      });
    });
  });

  describe("Missing Values", () => {
    test("should parse address with missing po box value", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _city,
        _state,
        _postalCode,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe("");
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse address with missing city value", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _state,
        _postalCode,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe("");
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse address with missing state value", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _postalCode,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe("");
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse address with missing postal code value", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _countryISO2,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe("");
      expect(result.country).toBe(_countryISO2);
    });

    test("should parse address with missing country value", () => {
      //arrange
      //build concatenated string for testing
      const testAddress = [
        _streetAddress1,
        _streetAddress2,
        _city,
        _state,
        _postalCode,
      ].join(_delimiter);

      //act
      const result = parseAddress(testAddress, _delimiter);
      expect(result).not.toBeNull();
      expect(result.streetAddress).toBe(_streetAddress1);
      expect(result.streetAddress2).toBe(_streetAddress2);
      expect(result.city).toBe(_city);
      expect(result.state).toBe(_state);
      expect(result.postalCode).toBe(_postalCode);
      expect(result.country).toBe("");
    });
  });
});
