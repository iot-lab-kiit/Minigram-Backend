import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');

            req.id = decodedData.id;
        }else{
            decodedData = jwt.decode(token);

            req.id = decodedData.sub;
        }
    }catch(error){
        console.log(error);
    }
}

export default auth;