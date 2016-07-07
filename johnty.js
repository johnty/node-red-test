module.exports = function(RED) {

    LCD = require('./node_modules/i2c-lcd/lib/lcd');
    
    var lcd = new LCD("/dev/i2c-1", 0x3f);
    lcd.init().then(function() {
        lcd.print("welcome node-red!");
    });

    function JohntyNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            lcd.clear().then(function() {
                lcd.print(msg.payload);
            }); 
            node.send(msg);
        });
    }
    RED.nodes.registerType("johnty",JohntyNode);


    
}
