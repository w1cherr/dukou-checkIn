import axios from "axios"

const token = process.argv[2]
const url = 'https://dukou.dev/api/user/checkin'
async function checkIn(){
    let res;
	try{
            res  = await axios.get(url,{
                    headers:{
                            "access-token": token
                    }
            })
            if (res.data) {
                res = res.data
            } else {
                res = 'token失效了'
            }
	}catch(err){
            console.log(err);
	}
	return res;
}

(async () => {
    console.log('开始');
    let result = await checkIn();
    console.log('result', result);
    console.log('结束');
  })();