import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), '.env')})

const config  = {
   CONNECTION_STRING : process.env.CONNECTION_STRING || '',
   PORT : process.env.PORT || 5000,
   JWT_SECRET : process.env.JWT_SECRET || 'KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
}

export default config;