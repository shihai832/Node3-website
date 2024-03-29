const request = require('request')

const geocode = (address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2hpaGFpIiwiYSI6ImNrNDFrcWVwczAyZjgzbHN3anliZTF4dncifQ.jSQPZz9V9QcxU2UIVBNc7A'
    
    request({url, json: true}, (error, {body}) => {

        if (error){
    
            callback('cant get a resposnse from the server', undefined)
    
        } else if (body.features.length < 1){
            callback(`make sure your inquery ${body.query[0]}  is correct `, undefined)
            } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            }) 
            
        }
      
    }) 
}

module.exports=geocode