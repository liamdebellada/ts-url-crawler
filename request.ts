import * as axios from 'axios'
const RE = RegExp(/(https?:\/\/[^\s]+)/g)
const URLRE = RegExp(/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm)
const FILERE = RegExp("^.+?[^\/:](?=[?\/]|$)")
const pRequest = async (url: string) => {
    return await axios.default.get(url)
    .then((res: any) => {
        if (res.data) {
            return res.data.match(RE).map((i: any) => {
                return i.match(URLRE)
            }).flat(1)
        } else {
            return false
        }
    }).catch(() => false)
}

const iRequests = async (base: string, i: number) => {
    var bres = await pRequest(base)
    if (bres != false) {
        let urls: any = [];
        let nyScraped: any = [];
        let item: any;
        for (item in bres) { //base url iterator
            let bu = await pRequest(bres[item])
            if (nyScraped.length < i) {
                nyScraped.push(bres[item])
            }
            urls.push(bu)
        }
        for (item in nyScraped){
            urls.push(await pRequest(nyScraped[item]))
        }
        urls = urls.flat(1).map((x: any) => {if (x) return x.match(FILERE)[0].replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')})
        return new Set(urls)
    }
}

(async () => {
    console.log(await iRequests('https://google.com', 1)) //url & depth
})()