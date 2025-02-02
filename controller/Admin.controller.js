const otpGenerator = require('otp-generator')
const admin = require('../model/adminModel')
const AdminUser = require('../model/adminModel')
const { plainToHash, hashToPlain } = require('../utils/password')
const sendEmail = require('../config/mail')


exports.createUser = async(req,res)=>{

 try {
       const {username,email,password}=req.body
       const existEmail = await AdminUser.findOne({email})
       if(existEmail){
        res.json("email already exist")
       }
       else{
        req.flash("info", "your registration successfully");
        const hashPass =await plainToHash(password)
           const user = await AdminUser.create({username,email,password:hashPass})
           res.redirect('/login')
       }
   
 } catch (error) {
    res.json(error);
 }
}

exports.loginUser = async(req,res)=>{
    
    try {
        const{email,password}= req.body
        const ExistEmail = await AdminUser.findOne({email}).countDocuments().exec()
    
        if(ExistEmail > 0){
            const admin = await AdminUser.findOne({email})
            console.log(admin);
            
    
            const PassMatch = await hashToPlain(password,admin.password)
            if(PassMatch){
    
                const payload = {
                    UserName:admin.username,
                    email:admin.email
                }
                res.cookie('admin',payload,{httpOnly:true})
                res.redirect('/')
    
            }
            else{
                res.json("password Not match")
            }
        }
        else{
            res.json("email in not exist")
        }
    } catch (error) {
        res.json(error)
        
    }

}

exports.updateProfile = async(req,res)=>{
    // console.log(req.body);

    // console.log(req.file);
    try {
        const {email,username}=req.body
    
        const existEmail = await admin.findOne({email}).countDocuments().exec()
        
        if(existEmail>0){
            await admin.updateOne({email:email},{username,profile_image:req?.file?.filename})
    
            res.redirect('/profile')
        }
    } catch (error) {
        res.json(error)
        
    }
}

exports.updatePassword = async(req,res)=>{
    try {
        const {email}= req.body
        const existEmail = await AdminUser.findOne({email}).countDocuments().exec()
    
        
        if(existEmail > 0){
            var otp = otpGenerator.generate(6,{upperCaseAlphabets:true,specialChars:true})
            const htmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #4CAF50; text-align: center;">Account Verification OTP</h2>
                <p>Dear User,</p>
                <p>We received a request to verify your account. Use the OTP below to complete your verification process. This OTP is valid for the next <b>10 minutes</b>.</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px dashed #4CAF50; border-radius: 5px;">${otp}</span>
                </div>
                <p>If you did not request this, please ignore this email. Do not share this OTP with anyone for security reasons.</p>
                <p>Thank you,<br><b>Your Company Name</b></p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">If you have any issues, contact us at <a href="mailto:support@yourcompany.com" style="color: #4CAF50;">support@yourcompany.com</a>.</p>
            </div>
        `;
        const admin = await AdminUser.updateOne({email:email},{
            token:otp
        })
            await sendEmail(email,"forgot password",htmlContent)
            req.flash("info","check your email")
            res.redirect("/forgotPassword")
        }
        else{
            req.flash("info","email is not Exist")
            res.redirect('/login')
        }
    } catch (error) {
        res.json(error);
        
    }

}

exports.changePassword =  async(req,res)=>{
    // console.log(req.body)
   try {
     const{email,currPassword,newPassword,confirmPassword} = req.body
 
     const existEmail = await AdminUser.findOne({email}).countDocuments().exec()
 
     // console.log(existEmail);
     if(existEmail >0){
     const admin = await AdminUser.findOne({email})
 
     const match =await hashToPlain(currPassword,admin.password)
     console.log(match);
     
     if(match){
         if(newPassword == confirmPassword){
             const hash_pass = await plainToHash(newPassword)
 
             await AdminUser.updateOne({email:email},{password:hash_pass})
           res.redirect('/')
 
         }else{
             res.json("confirm pass not match new password")
         }
 
     }
     else{
         res.json("password in not Match ")
     }
         
     }else{
         res.json("email is not Exist")
     }
   } catch (error) {
    res.json(error)
    
   }
    
}

exports.forgotPassword = async(req,res)=>{
    // console.log(req.body)
  try {
      const{token,password,confirmPassword} = req.body
  
      const existToken = await AdminUser.findOne({token}).countDocuments().exec()
  
      if(existToken){
          if(password === confirmPassword){
              const hash_pass = await plainToHash(password)
              const admin = await AdminUser.findOne({token})
  
              await AdminUser.findByIdAndUpdate({_id:admin._id},{password:hash_pass,token:""})
              
              req.flash("info","password change successfully")
              res.redirect('/login')
          }
          else{
              req.flash("info","password in not match")
          res.redirect("/forgotPassword")
          }
      }
      else{
          req.flash("info","token is not valid")
          res.redirect("/forgotPassword")
      }
  } catch (error) {
    res.json(error)
  }


}