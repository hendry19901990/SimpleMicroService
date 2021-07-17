let Messages = require('./models/Messages');
let rabbitMQ = require('./rabbitMQ');

const controller = {}; 
controller.create = async ( req, res) =>{
    try {

      console.log(req.body);

      rabbitMQ("input", JSON.stringify(req.body));

      if(req.body.message.length > 20 || 
        req.body.message.indexOf("b") != -1 ||
        req.body.message.indexOf("c") != -1 || 
        req.body.message.indexOf("d") != -1 ||
        req.body.message.indexOf("t") != -1){
          return res.status(400).send({});
       }

       setTimeout(async() => {

          Messages.create({
            content: req.body.message
          })
          .then(function(data){
            rabbitMQ("updatedResult", JSON.stringify({id: data.id, content: req.body.message}));
            return res;
          })
          .catch(e =>{
            console.log(e);
            return res;
          });
         
       }, 5000);

       res.json({ success: true, result:"created successful" });
  
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  };

controller.list = async (req, res) => {
    const response = await Messages.findAll()
    .then(function(data){
        const res = { success: true, data: data }
        return res;
    })
    .catch(error =>{
        const res = { success: false, error: error }
        return res;
    })
    res.json(response);
};

module.exports = controller;
