import httpClientLib from "/lib/http-client";
import cacheLib from "/lib/cache";

const cache = cacheLib.newCache({
    size: 1,
    expire: 3600 * 24,
})

export function getNaceCodes () {
    const items = cache.get('nace', function() {
        const response = httpClientLib.request({
            url: 'https://data.ssb.no/api/klass/v1/versions/30.json',
            method: 'GET'
        });

        if(response.status !== 200) {
            return []
        }

        const jsonResponse = JSON.parse(response.body);

        return jsonResponse.classificationItems.map((item) => ({
            id: item.code,
            displayName: item.code + " " + item.shortName,
            description: item.name,
        }))
    })
    return items;
}