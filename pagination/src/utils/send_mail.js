//const transporter = require("../configs/mail")

module.exports = (req, res) => {

    const message = {
            
        from: "sender@server.com",
        to: req.body.email,
        subject: ` Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
        text: `Hi ${req.body.first_name}, Please confirm your email address`,
        html: `<h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`
    };
    
    
    // console.log('message_user:', message)
    
    transporter.sendMail(message);

}
