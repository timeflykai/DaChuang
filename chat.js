const axios = require('axios');

async function getAccessToken() {
    const apiKey = '4qGO7h8cGdN6wpgcOhvFbrKW';
    const secretKey = 'oAhqdtRUmms2Lo07W3L7ASEJw4cu4XGV';
    const url = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`;

    try {
        const response = await axios.post(url);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response.data);
        throw error;
    }
}

async function getBotAns(messages) {
    // const accessToken = await getAccessToken();
    // console.log(accessToken)
    const accessToken ="24.88a94bb7279118eb6ad22a671d0f7823.2592000.1714132356.282335-58260912"
    const url = `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-lite-8k?access_token=${accessToken}`;

    const payload = {
        messages: messages
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data["result"];
        // console.log(response.data["result"]);
    } catch (error) {
        console.error('Error:', error.response.data);
        return "error"
    }
}
module.exports=getBotAns