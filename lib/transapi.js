// var fetch = require('node-fetch')
var axios = require('axios').default
require('dotenv').config()
//experiment between using axios and fetch (pros and cons)

axios.defaults.headers.common = {
    'Authorization': `Bot ${process.env.TOKEN}`
}

//incorporating adding 'id' parameter for user inputs/searchs
function getUserInfo(id) {
    return axios.get('https://discord.com/api/v9/users/' + id)
}

function getUserGuilds(){
    return axios.get('https://discord.com/api/v9/users/@me/guilds')
}

function getGuildsInfo(id){
    return axios.get('https://discord.com/api/v9/guilds/'+ id)
}
function convertID(id){
    binary = parseInt(id).toString(2) //10111000100010101000001010011111100110000100000000000000000
    // return binary
    pad = binary.padStart(64,'0') //fills current string until it reaches stated length 
    // in this case binary is only lenght 57, therefore we add 7 more 0's in front to make the length 64
    // result : 000000010111000100010101000001010011111100110000100000000000000000
    substr = pad.substring(0,42)
    // substr = binary.substring(0,42 - (64 - binary.length))
    decimal = parseInt(substr, 2) //784334848
    epoch = decimal + 1420070400000
    return created = new Date(epoch).toUTCString()
}

console.log(convertID(415549514741579786))

function getAllData(id){
    return Promise.all([getUserInfo(id)])
        .then(async function(response){
            //add more flags/badges
            const flagList= [
                ["Discord_Employee", 1],
                ["Partnered_Server_Owner", 2],
                ["HypeSquad_Event", 4],
                ["Bug_Hunter_Level_1", 8],
                ["HypeSquad_Bravery", 64],
                ["HypeSquad_Brilliance", 128],
                ["HypeSquad_Balance", 256],
                ["Early_Supporter", 512],
                ["Bug_Hunter_Level_2", 16384],
                ["Verified_Bot", 65536],
                ["Early_Verified_Bot_Developer", 131072],
                ["Discord_Certified_Moderator", 262144]
            ]


            // console.log(response[0].status)
             //200 OK vs 404 Fail
            //need to be accessed through index as its sorted by arrays format
            // console.log(response[0].data)
            var userData = response[0].data
            console.log(userData)
            var flag = []

            for(let i = 0; i < flagList.length; i++){
                if((userData.public_flags & flagList[i][1])== flagList[i][1]){
                    flag.push(flagList[i][0])
                }
            }

            date = convertID(id)
            
            if(!flag.includes('Verified_Bot') & userData.bot){
                flag.push('Bot')
            }
            /* IMPORTANT
            add date creation date by converting user ID to unix
            */
            console.log('badge '  + flag)
            var data = {
                status: response[0].status,
                id: userData.id,
                username: userData.username,
                discriminator: userData.discriminator,
                avatar: userData.avatar,
                banner: userData.banner,
                bancolor: userData.banner_color,
                accent: userData.accent_color,
                badge: flag,
                date: date
                
            }
            //415549514741579786
            return data
            // console.log(response[0].data.username)
            // id: '170667250070716419',
            //     username: 'Noraa',
            //         avatar: 'e784b2bd14fe29f2f66e3513e369630f',
            //             avatar_decoration: null,
            //                 discriminator: '1633',
            //                     public_flags: 0,
            //                         banner: null,
            //                             banner_color: null,
            //                                 accent_color: null
            // username = response[0].data.username
            // return username

        })
        .catch(function(error){
            console.log('error')
            console.log(error.response.status)
            console.log(error.response.data)
        })
}



module.exports = {
    getAllData: getAllData,
    getUserInfo: getUserInfo,
}


//https://stackoverflow.com/questions/66157948/image-not-found-altough-right-relative-path-is-specified
//https://stackoverflow.com/questions/65974746/discord-api-user-flags-return-badges