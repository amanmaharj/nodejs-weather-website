const request=require('request')
const geocode=(address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1hbm1haCIsImEiOiJjanozMjAxaHIwMWJvM2NxaGIzejUyMHR6In0.n0bBu2HILiP4Yggfl243Pg&limit=1'
    request({url,json: true},(error,{body})=>{
            if(error){
                callback('unable to reach to the mapbox',undefined)
            }else if(body.features.length===0){
                callback('address not given correctly',undefined)
            }else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
    })
}

module.exports=geocode