fetch("http://localhost:8081/dev-api/order/ap-order/list?pageNum=1&pageSize=10", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM5YzAzZDM5LTJmNWMtNDE0NS04MGJkLWM5NzM3ZTBkMGFkYSJ9.8ZbbgF2t9hCf1uJfd1NKO6khcfzuyrSxgPfrdExSGBB17p-gpvHAwJg5Dq0yN8V5Bs97MTf5XnqmMKkinGRYCw",
    "content-type": "application/json;charset=UTF-8",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://localhost:8081/supplierOrder",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"pageSize\":10,\"pageNum\":1}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
