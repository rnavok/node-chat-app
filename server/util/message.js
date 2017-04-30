const moment = require('moment');

var generateMessage = (from,text) =>{
    return {
        from,
        text,
        createdAt :  moment().valueOf()
    };
};


var generateLocationMessage = (coords) => {
    console.log(coords);
    coords.createdAt =   moment().valueOf()
    coords.link = `http://google.com/maps?q=${coords.coords.lat},${coords.coords.lng}`;
    coords.imgLink = `http://maps.googleapis.com/maps/api/staticmap?center=${coords.coords.lat},${coords.coords.lng}&zoom=17&size=400x400`
    return coords;
    
    
}
module.exports = {generateMessage,generateLocationMessage};