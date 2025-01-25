const {createTransport}= require('nodemailer')

const transPort = createTransport({
    service:'gmail',
    auth:{
        user:"yashraw111@gmail.com", 
        pass:"wcpb umaw hoaa qjfw"
    }
})

async function sendEmail(to,subject,html){
    const options = {
        from:"yashraw111@gmail.com",
        to:to,
        subject:subject,
        html:html
    }
    
    await transPort.sendMail(options,(err,info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("send mail")
        }
    })
}

module.exports = sendEmail