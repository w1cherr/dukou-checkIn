import axios from "axios"

// const token = process.argv[2]
const email = process.argv[2]
const passwd = process.argv[3]
let token = ''
const getTokenUrl = 'https://dukou.dev/api/token'
const checkInUrl = 'https://dukou.dev/api/user/checkin'

async function getToken(){
    let res;
	try{
            res  = await axios.post(getTokenUrl,{
                email: email,
                passwd: passwd
            })
            if (res.data.token) {
                res = res.data.token
            } else {
                res = '登录失败'
            }
	}catch(err){
            console.log('getTokenErr', err);
	}
	return res;
}

async function checkIn(){
    let res;
	try{
            res  = await axios.get(checkInUrl,{
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
            console.log('checkInErr', err);
	}
	return res;
}

(async () => {
    console.log('开始获取token');
    token = await getToken();
    console.log('获取token result', token);
    await new Promise(r => setTimeout(() => {r()}, 1000))
    if (!!token) {
        console.log('开始checkIn result');
        let result = await checkIn();
        console.log('checkIn result', result);
    }
    console.log('结束');
  })();