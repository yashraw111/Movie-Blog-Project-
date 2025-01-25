// exports.accessPage = (req,res,url)=>{
//     if(!req.cookies.admin){
//         res.redirect('/login')
//       }
//       else{
//         res.render(url);
//       }
// }

exports.accessPage = (req,res,url)=>{
    if(!req.cookies.admin){
        res.redirect('/login')
    }else{
        res.render(url)
    }
}