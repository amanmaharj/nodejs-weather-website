const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/f3b6f78e4528f28a7d1e87b91e958c60/'+latitude+','+longitude+'?units=si'
    request({url,json: true}, (error,{body})=>{
        if(error){
            callback('You are not connected to the internet', undefined)
        }
        else if(body.error){
            callback('The longitude and latitude are not match',undefined)
        }
        else{
            callback(undefined, {forecast: body.daily.data[0].summary+' The temperature is '+ body.currently.temperature+', There is '+body.currently.precipProbability+' % chance of rain'})
            
        }
        
    })
}

module.exports=forecast