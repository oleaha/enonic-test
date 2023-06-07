const naceLib = require("../../lib/nace");

exports.get = handleGet;

function handleGet(req) {

    const items = naceLib.getNaceCodes();

    if(!items || items.length === 0) {
        throw new Error("Could not fetch NACE codes from SSB");
    }

    if(req.params.query) {
        const query = req.params.query;
        const filtered = items
            .filter((item) => item.displayName.indexOf(query) >= 0 || item.description.indexOf(query) >= 0)

        return {
            contentType: 'application/json',
            body: {
                hits: filtered,
                count: filtered.length,
                total: filtered.length
            }
        }
    }


    return {
        contentType: 'application/json',
        body: {
            hits: items,
            count: items.length,
            total: items.length
        }
    }
}