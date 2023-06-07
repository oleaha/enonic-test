const t = require('/lib/xp/testing');


const mockedImportedFuncs = {};
t.mock("/lib/nace.js", mockedImportedFuncs);

export function mockGetNaceCodes(mockedReturn) {
    mockedImportedFuncs.getNaceCodes = function () {
        return mockedReturn;
    }
    t.mock("/lib/nace.js", mockedImportedFuncs);
}

const items = [
    {
        id: "01",
        displayName: "01 Test",
        description: "A longer test description",
    },
    {
        id: "02",
        displayName: "02 A code",
        description: "Second description"
    }
];

exports.testGetAllNACECodes = function () {
    mockGetNaceCodes(items)

    const service = require('./company-codes-lookup-service');
    const result = service.get({params: {}});

    t.assertJson(items, result.body.hits);
}

exports.testGetFilteredNACECodes = function () {
    mockGetNaceCodes(items)

    const service = require('./company-codes-lookup-service');
    const result = service.get({params: {query: "01 Test"}});

    t.assertJson(items[0], result.body.hits[0]);
}

exports.testGetNACEFromSSBFails = function () {
    mockGetNaceCodes([])

    const service = require('./company-codes-lookup-service');

    t.assertThrows(() => service.get({params: {}}));
}