var request = require("request");
var fs = require('fs');
const cheerio = require('cheerio');



async function makeRequest(id) {
    console.log('make request ', id)
    //th1 proxyGenerator() doi luon ip, cong cho minh thi viet 
    proxy: proxyGenerator()
    return new Promise((resolve, reject) => {
            request({
                url: `https://gappapi.deliverynow.vn/api/delivery/get_detail?id_type=2&request_id=${id}`,
                method: 'GET',
                headers: {
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
                    Accept: '*/*',
                    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                    'Content-Type': 'text/plain;charset=UTF-8',
                    'content-type': 'application/json;charset=UTF-8',
                    // 'content-length': 71,
                    origin: 'https://www.now.vn',
                    referer: 'https://www.now.vn/',
                    authority: 'gappapi.deliverynow.vn',
                    'sec-fetch-dest': "empty",
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
    
                    'x-foody-access-token': '',
                    'x-foody-api-version': 1,
                    'x-foody-app-type': 1004,
                    'x-foody-client-id': '',
                    'x-foody-client-language': 'vi',
                    'x-foody-client-type': 1,
                    'x-foody-client-version': '3.0.0'
                }, json: true
            }, (error, response) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    // console.count('now');
                    // console.log('ID: ', id);
                    var a = response.body.reply
                    resolve(a)
                    // console.count('stt:',body.reply.dilivery_detail.delivery_id)
                    
                    // const img = body.reply.delivery_detail.photos
                    // console.log('   ', img[10].value)
                    // var download = function (uri, filename, callback) {
                    //     request.head(uri, function (err, res, body) {
                    //         console.log('content-type:', res.headers['content-type']);
                    //         console.log('content-length:', res.headers['content-length']);

                    //         request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    //     });
                    // };

                    // download(img[10].value, 'now.png', function () {
                    //     console.log('done');
                    // });
                    // console.log('   ', body.reply.delivery_detail.position)
                    // console.log('   ', body.reply.delivery_detail.city_id)
                    // console.log('   ', body.reply.delivery_detail.district_id)
                    // resolve(body)
                }
            })
    })
}

async function run(){
    for (let i = 0; i <10; i++) {
        // let proxy = await proxyGenerator()
        let data = await makeRequest(i).catch((error)=>{
            console.log('Promise error: ', error)
        })
        console.log('data:\n', i, data)
            try {
                console.log(Object.keys(data))
                console.log(data.delivery_detail.delivery_id)
                console.log(data)
            } catch (error) {
                console.log('data error ', i)
            }
    }

}

run()




// makeRequest(177).then(data => {
//     console.log(data);
// })


async function proxyGenerator() {
    let ip_addresses = [];
    let port_numbers = [];
    let proxy;
    let random_number = Math.floor(Math.random() * 1);
  
    request("https://sslproxies.org/", function (error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
  
        $("td:nth-child(1)").each(function (index, value) {
          ip_addresses[index] = $(this).text();
        });
  
        $("td:nth-child(2)").each(function (index, value) {
          port_numbers[index] = $(this).text();
        });
      } else {
        console.log("Error loading proxy, please try again");
      }
  
      ip_addresses.join(", ");
      port_numbers.join(", ");
  
    console.log("IP Addresses:", ip_addresses[random_number]);
    console.log("Port Numbers:", port_numbers[random_number]);
    })
  }
