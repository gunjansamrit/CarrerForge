const {sign,verify}=require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;





const generateToken=(data,option={expiresIn:'15m'})=>
{
    const token=sign(data,SECRET_KEY,option);

    console.log(token);
    return token;


}

const verifyToken= (token)=>

{
    
    const ans= verify(token,SECRET_KEY)
    // console.log(ans);
    return ans;
}

module.exports={generateToken,verifyToken}


