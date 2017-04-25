var expect = require('expect');
var {generateMessage} = require('./message')

describe('generateMessage', () => {
    
    it('should have the message obejct with the right text and from and timestamp', () => {
        
        var from = "sender";
        var text = "the text"
        var message = generateMessage(from,text)
           expect(message).toInclude({from,text});
           expect(message.createdAt).toBeA('number');
            


    });
});