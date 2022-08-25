const verbMiddleware = (req, res, next) => {
  console.log('Request Type:', req.method);
  if(req.method==='GET'){
    res.status(200).json({message:'Hiciste una peticion tipo GET'})
  }else{
    next();
  }
  
}

module.exports = { verbMiddleware }