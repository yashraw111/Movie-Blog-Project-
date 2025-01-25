exports.accessPage = (req,res,url,extra)=>{
    if(!req.cookies.admin){
        res.redirect('/login')
      }
      else{
        res.render(url,extra);
      }
}

// exports.accessPage = (req,res,url)=>{
//     if(!req.cookies.admin){
//         res.redirect('/login')
//     }else{
//         res.render(url)
//     }
// }