const expressjwt=require('express-jwt')

function authJwt(){

    const secret =process.env.SECRET;
    const api= process.env.API;

    return expressjwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            `${api}/users/signup`,
            `${api}/users/signin`,
            `${api}/public/uploads(.*)/`,
            {url: /\/api\/v4\/products(.*)/,methods:['GET','OPTIONS']},
            {url: /\/api\/v4\/categories(.*)/,methods:['GET','OPTIONS']},
            {url: /\/api\/v4\/users(.*)/,methods:['GET','PUT','OPTIONS']},
            {url:/\/api\/public\/uploads\/([/|.|\w|\s|-])*\.(?:jpg|gif|png)/,method:['GET']
        },
        ]
    })
}

async function isRevoked(req,payload, done){
    if(!payload.isAdmin){
        done(null,true)
    }
    done();
}

module.exports = authJwt;