const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGV0aGFuaHR1cGsiLCJhIjoiY2pzcmoyYWdrMWowcTQ0bjVtMDl5bmFwNCJ9.kOLPjc0-vAMN0M5OLty7NA';
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to map serevice', undefined);
        }
        else if(body.features.length === 0){
            callback('No location match, Try another search', undefined);
        }
        else {
            callback(undefined, {
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }

    })
};

module.exports = geocode;
