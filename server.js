var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.text.toLowerCase().indexOf('marco') < 0) {
    // In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
    return res.end()
  }

  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios
    .post(
      'https://api.telegram.org/bot1030807873:AAG5ljhJvFaZiVulomlgIhBYGxxG7YTZhYQ/sendMessage',
      {
        chat_id: message.chat.id,
        text: 'Polo!!'
      }
    )
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

const PORT = 3000 || process.env.PORT;

// Finally, start our server
app.listen(PORT, function() {
  console.log(`Telegram app listening on port ${PORT}!`);
})




// const express = require('express');
// const app = express();
// const axios = require('axios');
// const cheerio = require('cheerio');

// const TelegramBot = require('node-telegram-bot-api');

// const token = '1030807873:AAG5ljhJvFaZiVulomlgIhBYGxxG7YTZhYQ';
// const bot = new TelegramBot(token, {polling: true});

// // whare_am_i - get you'r current location
// // get_my_country_data - get you'r current location data
// // get_global_total_data - get all total datas conserning covid-19
// // get_all_countrys_global_data - get all country's data

// const opts = {
//   reply_markup:{
//     keyboard: [
//       ['/whare_am_i'],
//       ['/get_my_country_data'],
//       ['/get_global_total_data'],
//       ['/get_all_countrys_global_data']
//     ]
//   },
//   parse_mode: 'Markdown'
// };


// bot.onText(/\/echo (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const resp = match[1];

//   bot.sendMessage(chatId, resp);
// });

// express.get('/', (req, res) => {
  
//   //all bot messaging goes here...
//   bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
    
//     if(msg.text === '/whare_am_i') {
//       bot.sendMessage(chatId, '*You are currently located on:*', opts);
//       bot.sendMessage(chatId, 'Loading location Please wailt...');
//       getLocation().then(res => {
//         bot.sendMessage(chatId, `.\n.\nCountry: ${res.data.country}\nCity: ${res.data.city}\nRegion: ${res.data.region} (${res.data.regionName})\nTimezone: ${res.data.timezone}\n.\n.
//         `);
//       });
//     } else if(msg.text === '/get_my_country_data') {
//       bot.sendMessage(chatId, 'Loading Data Please wait...');
//       getScrappableData().then(res => {
//         const countrysData = scrapAllCountrysData(res.data);
//         getLocation(chatId).then((res) => {        
//           const countryData = countrysData.filter((country) => res.data.country === country.name);
//           console.log(countryData)
//           bot.sendMessage(chatId, `.\n.\nCountry: ${countryData[0].name}\nNew Cases: ${countryData[0].newCase}\nNew Death: ${countryData[0].newDeath}\nTotal Cases: ${countryData[0].totalCase}\nTotal Death: ${countryData[0].totalDeath}\nTotal Recovered: ${countryData[0].totalRecovered}\nTotal Active Cases: ${countryData[0].activeCases}\nOn Serious Condition: ${countryData[0].seriousCritical}\nTotal Case Per Population: ${countryData[0].totalCasePerPop}\nTotal Death Per Population: ${countryData[0].totalDeathPerPop}\nFirst Case Found on: ${countryData[0].reported1stDate.substring(2)}\n.\n.`)
//         })
//       })
//     }
//     else if(msg.text === '/get_global_total_data') {
//       bot.sendMessage(chatId, 'Loading Total Global Covid Datas:');
//       bot.sendMessage(chatId, 'Loading Data Please wait...');
//       getScrappableData().then(res => {
//         const globalData = scrapGlobalData(res.data);
//         bot.sendMessage(chatId, `.\n.\nData: GLOBAL DATA\n\nNew Cases: ${globalData.totalNewCases}\n\nNew Death: ${globalData.totalNewDeath}\n\nTotal Cases: ${globalData.totalCases}\n\nTotal Death: ${globalData.totalDeath}\n\nTotal Recovered: ${globalData.totalRecovered}\n\nTotal Active Cases: ${globalData.totalActiveCase}\n\nOn Serious Condition: ${globalData.totalSeriousCritical}\n\nTotal Case Per Population: ${globalData.totalCasePerPop}\n\nTotal Death Per Population: ${globalData.totalDeathPerPop}\n.\n.`)
//       });
//     } else if(msg.text === '/get_all_countrys_global_data') {
//       bot.sendMessage(chatId, 'Loading All Countrys Statstics:');
//       bot.sendMessage(chatId, 'Loading Data Please wait...');
//       getScrappableData().then(res => {
//         const countrysData = scrapAllCountrysData(res.data);
//         let allCountrysDataTemplate = ``;
//         countrysData.forEach(country => {
//           bot.sendMessage(chatId, `\n------------------------\nCountry: ${country.name}\nNew Cases: ${country.newCase}\nNew Death: ${country.newDeath}\nTotal Cases: ${country.totalCase}\nTotal Death: ${country.totalDeath}\nTotal Recovered: ${country.totalRecovered}\nTotal Active Cases: ${country.activeCases}\nOn Serious Condition: ${country.seriousCritical}\nTotal Case Per Population: ${country.totalCasePerPop}\nTotal Death Per Population: ${country.totalDeathPerPop}\nFirst Case Found on: ${country.reported1stDate.substring(1)}\n\n------------------------\n`);
//         });
//       });
//     } else {
//       bot.sendMessage(chatId, `
//   /whare_am_i - get you'r current location
//   /get_my_country_data - get you'r current location data
//   /get_10_countrys_high_covid_case - get top 10 countrys with high covid cases
//   /get_global_total_data - get all total datas considering covid-19
//   /get_all_countrys_global_data - get all country's data`)
//     }
//   })  

// })



// //
// // getting location using http://ip-api.com/json/ api
// // @param chatId
// // @return location json object
// const getLocation = async () => {
//   try {
//     const response = await axios.get('http://ip-api.com/json/');
//     return response
//   } catch(error) {
//     console.log(error);
//   }
// }

// // get requets to https://www.worldometers.info/coronavirus/
// // @return html code
// const getScrappableData = async () => {
//   try {
//     let res = await axios.get('https://www.worldometers.info/coronavirus/');
//     return res;
//   } catch(error) {
//     console.log(error);
//   }
// }


// // scrapping the total stat of the global contenent
// // @param res html
// // @return globalData object
// const scrapGlobalData = (html) => {
//   const $ = cheerio.load(html);
//   const globalData = {};
//   globalData.totalCases = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(2)').text();
//   globalData.totalNewCases = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(3)').text();
//   globalData.totalDeath = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(4)').text();
//   globalData.totalNewDeath = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(5)').text();  
//   globalData.totalRecovered = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(6)').text();
//   globalData.totalActiveCase = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(7)').text();
//   globalData.totalSeriousCritical = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(8)').text();
//   globalData.totalCasePerPop = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(9)').text();
//   globalData.totalDeathPerPop = $('#main_table_countries_today > tbody:nth-child(3) > tr > td:nth-child(10)').text();
//   return globalData;
// }


// // scrapping the html data using cheerio
// // @param res html
// // @return array of countrys data object
// const scrapAllCountrysData = (html) => {
//   const $ = cheerio.load(html);
//   const countrysData = [];

//   const rowData = $('#main_table_countries_today > tbody:nth-child(2) > tr');
//   rowData.each((i, elm) => {
//     const country = {};
//     country.name = $(elm.children[1]).text();
//     country.totalCase = $(elm.children[3]).text();
//     country.newCase = $(elm.children[5]).text();
//     country.totalDeath = $(elm.children[7]).text();
//     country.newDeath = $(elm.children[9]).text();
//     country.totalRecovered = $(elm.children[11]).text();
//     country.activeCases = $(elm.children[13]).text();
//     country.seriousCritical = $(elm.children[15]).text();
//     country.totalCasePerPop = $(elm.children[17]).text();
//     country.totalDeathPerPop = $(elm.children[19]).text();
//     country.reported1stDate = $(elm.children[21]).text();
//     countrysData.push(country);
//   });

//   return countrysData;
// }


// const sortUtil = (a, b) => {
//   const cA = parseInt(a.totalCase);
//   const cB = parseInt(b.totalCase);
//   if (cA > cB) {
//     return 1;
//   } else if (cA < cB) {
//     return -1;
//   } else {
//     return 0;
//   }
// }


// // server
// const PORT = 3000 || process.env.PORT;
// app.listen(PORT,() => console.log('server started on ', PORT));