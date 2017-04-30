var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message')
var url = require("url");


describe('generateMessage', () => {
    
    it('should have the message obejct with the right text and from and timestamp', () => {
        
        var from = "sender";
        var text = "the text"
        var message = generateMessage(from,text)
           expect(message).toInclude({from,text});
           expect(message.createdAt).toBeA('number');
    });

describe('generateLocationMessage', () => {

    it('should send the coods with map info and time', () => {
        var coords =  {
            "coords" : {
                    "lng" :"1.2",
                    "lat" : "2.1"
            }
        };                    
        
        var locationMessage = generateLocationMessage(coords)

           expect(locationMessage).toIncludeKey('coords',"createdAt","imgLink","link");
        //    expect(locationMessage.lng).toBeA('number');
        //    expect(locationMessage.lat).toBeA('number');
           expect(url.parse(locationMessage.imgLink));
           expect(url.parse(locationMessage.link));                   
    });

});



});