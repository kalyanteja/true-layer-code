var assert = require('assert');
const { isValidUri, extractNumber, limitTo256Chars } = require('../Utils.js');

describe('Testing url validity', function () {
    it('invalid random url should fail', () => {
        const url = "httxshelloco/resting/bench";
        const isValid = isValidUri(url);
        assert.equal(isValid, false);
    });

    it('valid url, should pass', () => {
        const url = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.searchenginejournal.com%2Fwp-content%2Fuploads%2F2018%2F07%2FThe-Smart-Marketer%25E2%2580%2599s-Guide-to-Google-Alerts-760x400.png&imgrefurl=https%3A%2F%2Fwww.searchenginejournal.com%2Fgoogle-alerts-marketers-guide%2F262011%2F&docid=CIXsj8TgU8NyKM&tbnid=qoGCQV-fXnsoJM%3A&vet=10ahUKEwijmsXYl-DjAhU1A2MBHYYvBmgQMwiEASgEMAQ..i&w=760&h=400&safe=strict&bih=754&biw=1536&q=google%20images&ved=0ahUKEwijmsXYl-DjAhU1A2MBHYYvBmgQMwiEASgEMAQ&iact=mrc&uact=8";
        const isValid = isValidUri(url);
        assert.equal(isValid, true);
    });
});

describe('Extract numebers out of a string', function () {
    it('get all numbers from a string', () => {
        const value = extractNumber("12werr#$sda3");
        assert.equal(value, 123);
    });

    it('get all numbers from a string', () => {
        const value = extractNumber("err#$sda");
        assert.equal(value, '');
    });
});

describe('testing character limits', () => {

    const charMoreThan256 = "'We have to see': Liverpool may select Mohamed Salah and Roberto Firmino from the start against Manchester City, admits Jurgen Klopp...but says it will depend on next few days of training..Manchester United agree deal with Monaco over £9m move for 16-year-old midfielder Hannibal Mejbri";
    const charLessThan256 = "Liverpool may select Mohamed Salah and Roberto Firmino from the start against Manchester City";

    it('is reduced to 256 limit', () => {
        const reducedStr = limitTo256Chars(charMoreThan256);
        assert.equal(reducedStr.length, 256);
    });

    it('when less tha  256 limts is passed, it should do nothing', () => {
        const reducedStr = limitTo256Chars(charLessThan256);
        assert.equal(reducedStr.length, charLessThan256.length);
    });

    it('when null/undefined url passed, should return blank string', () => {
        const reducedStr = limitTo256Chars(undefined);
        assert.equal(reducedStr, '');
    });
});