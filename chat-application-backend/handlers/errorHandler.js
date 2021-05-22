//catch error handeler

exports.catchErrors = (fn)=>{
    return function(req, res, next) {
        fn(req, res, next).catch((err)=>{
            if(typeof err === "string"){
                res.status(400).json({
                    message: err,
                });
            }else{
                next(err);
            }
        });
    };
};


//mongoose error handler

exports.mongoseErrors =(err, req, res, next)=>{
    if(!err.errors) return next(err);
    const errorKeys =object.keys(err.errors);
    let message ="";
    errorKeys.forEach((key)=>(message+=err.error[key].message + ", "));

    message =message.substr(0,message.length -2);

    res.status(400).json({
        message,
    });
};



//development error handler

exports.developmentErrors =(err, req, res, next)=>{
    err.stack = err.stack || "";
    const errorDetails ={
        message: err.message,
        status: err.status,
        stack: err.stack,
    };

    res.status(err.status || 500).json(errorDetails);
};



//productionErrors handler


exports.productionErrors = (err, req, res, next)=>{
    res.status(err.status || 500).json({
      error: "Internal Server Error",    
    });
};



//not found error handler

exports.notFound = ( req, res, next)=>{
    res.status( 404).json({
      message: "Route not found",    
    });
};
