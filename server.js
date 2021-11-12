const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')
const app = express()
const corsOption = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOption))
app.use(express.static(__dirname));

const port = process.env.PORT || 5000

const sources = {
    "techcrunch": "https://techcrunch.com/",
    "gizmodo": "https://gizmodo.com/",
    "verge": "https://www.theverge.com/",
    "venturebeat": "https://venturebeat.com/",
    "wired": "https://www.wired.com/",
    "digitaltrends": "https://www.digitaltrends.com/",
    "engadget": "https://www.engadget.com/", 
    "gadgetreview": "https://www.gadgetreview.com/",
    "techradar": "https://www.techradar.com/",
    "nineto5mac": "https://9to5mac.com/",
    "androidauthority": "https://www.androidauthority.com/",
    "gsmarena": "https://www.gsmarena.com/"
}

const allNews = []
const techCrunch = []
const gizmodo = []
const verge = []
const ventureBeat = []
const wired = []
const digitalTrends = []
const engadget = []
const gadgetReview = []
const techrRadar = []
const nineto5Mac = []
const androidAuthority = []
const gsmarena = []

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/error404.html")
})

app.get("/:allnews", (req,res)=>{
    const allSource = req.params.allnews
    if(allSource=='allnews'){
        connectTCrunch()
        connectGizmodo()    
        connectVerge()         
        connectVBeat()  
        connectWired()  
        connectDTrends()     
        connectEngadget()       
        connectGReview()      
        connectTRadar()    
        connect9to5Mac()     
        connectAA()      
        connectGSMA()   
        res.json(allNews)
    }
    else{
        res.sendFile(__dirname + "/error404.html")
    }
})

app.get("/news/:sourceId", async (req,res)=>{

    const sourceId = req.params.sourceId

    if(sourceId=='gsmarena'){
        connectGSMA()
        res.json(gsmarena)
    }
    else if(sourceId=='androidauthority'){
        connectAA()
        res.json(androidAuthority)
    }
    else if(sourceId=='verge'){
        connectVerge()
        res.json(verge)
    }
    else if(sourceId=='gizmodo'){
        connectGizmodo()
        res.json(gizmodo)
    }
    else if(sourceId=='techradar'){
        connectTRadar()
        res.json(techrRadar)
    }
    else if(sourceId=='engadget'){
        connectEngadget()
        res.json(engadget)
    }
    else if(sourceId=='nineto5mac'){
        connect9to5Mac()
        res.json(nineto5Mac)
    }
    else if(sourceId=='gadgetreview'){
        connectGReview()
        res.json(gadgetReview)
    }
    else if(sourceId=='digitaltrends'){
        connectDTrends()
        res.json(digitalTrends)
    }
    else if(sourceId=='wired'){
       connectWired()
       res.json(wired)
    }
    else if(sourceId=='techcrunch'){
        connectTCrunch()
        res.json(techCrunch)
    }
    else if(sourceId=='venturebeat'){
        connectVBeat()
        res.json(ventureBeat)
    }
    else{
        res.sendFile(__dirname + "/error404.html")
    }
})
function connectTCrunch(){
    const sourceName = 'TechCrunch'
    const sourceUrl = sources.techcrunch
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.post-block',html).each(function(){
            let title = $(this).find('header').find('h2').text()
            if(title=='') return
            title = title.replace(/^\n\t+\n\t+/,"")     
            title = title.replace(/\t+\n\t+$/,"")   
            const img = $(this).find('footer').find('img').attr('src')
            const link = $(this).find('header').find('h2').find('a').attr('href')
            if(link=='') return
            let dateTime = $(this).find('header').find('time').text()
            dateTime = dateTime.replace(/^\n\t+/,"")
            dateTime = dateTime.replace(/\t$/,"")
            techCrunch.push({title,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectGizmodo(){
    const sourceName = 'Gizmodo'
    const sourceUrl = sources.gizmodo + 'tech'
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('article',html).each(function(){
            const title = $(this).find('a').find('h4').text()
            let img = $(this).find('a').find('img').attr('srcset')
            if(img==undefined) return
            img = img.split(',')
            let arr = []
            arr.push(img)
            arr = arr[0].slice(43,50)
            img = arr.toString()
            img = img.replace(/^\s/,"")
            const link = $(this).find('a').attr('href')
            gizmodo.push({title,img,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectVerge(){
    const sourceName = 'The Verge'
    const sourceUrl = sources.verge + 'tech'
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.c-entry-box--compact--article',html).each(function(){
            const title = $(this).find('.c-entry-box--compact__title').text()
            let img = $(this).find('noscript').text()
            img = img.replace(/^<img\salt=\"\"\ssrc=\"/, "")
            img = img.replace(/\">$/,"")
            const link = $(this).find('.c-entry-box--compact__title').find('a').attr('href')
            const dateTime = $(this).find('time').text().trim()
            verge.push({title,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectVBeat(){
    const sourceName = 'VentureBeat'
    const sourceUrl = sources.venturebeat
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.ArticleListing',html).each(function(){
            let title = $(this).find('header').find('h2').text()
            title = title.replace(/^\n\s+\t+/,"")
            title = title.replace(/\n\s+\t+$/,"")
            const img = $(this).find('a').find('img').attr('src')
            const link = $(this).find('a').attr('href')
            const dateTime = $(this).find('header').find('time').text()
            ventureBeat.push({title,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectWired(){
    const sourceName = 'Wired'
    const sourceUrl = sources.wired + 'category/artificial-intelligence/'
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.summary-item',html).each(function(){
            const title = $(this).find('.summary-item__content').find('a').find('h2').text()
            if(title=='') return
            const para = $(this).find('.summary-item__content').find('p').text()
            let img = $(this).find('.summary-item__asset-container').find('a').find('span').find('div').find('picture').find('noscript').html()
            let str = img.indexOf('><img')
            img = img.slice(str,img.length)
            str = img.indexOf('src=')
            img = img.slice(str, img.length)
            img = img.replace(/^src=\"/,"")
            img = img.replace(/\"\/>$/,"")
            let link = $(this).find('.summary-item__content').find('a').attr('href')
            link = link.replace(/^[/]/,"")
            link = sources.wired + link
            wired.push({title,para,img,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectDTrends(){
    const sourceName = 'DigitalTrends'
    const sourceUrl = sources.digitaltrends
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.b-synopsis-stack',html).each(function(){
            let title = $(this).find('.b-synopsis-stack__title').text()
            if(title=='') return
            title = title.replace(/^\n\t+/,"")
            title = title.replace(/\n\t+$/,"")
            const img = $(this).find('.b-synopsis-stack__image').find('img').attr('data-dt-lazy-src')
            const link = $(this).find('.b-synopsis-stack__title').find('a').attr('href')
            digitalTrends.push({title,img,link})
            allNews.push({title,img,link,sourceName})
        })
        $('.b-snippet',html).each(function(){
            let title = $(this).find('h3').text()
            if(title=='') return
            title = title.replace(/^\n\t+/,"")
            title = title.replace(/\n\t+$/,"")
            const img = $(this).find('.b-snippet__image').find('img').attr('data-dt-lazy-src')
            const link = $(this).find('h3').find('a').attr('href')
            digitalTrends.push({title,img,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectEngadget(){
    const sourceName = 'engadget'
    const sourceUrl = sources.engadget
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('li',html).each(function(){
            const title = $(this).find('article').find('h2').text()
            if(title=='') return
            const img = $(this).find('article').find('a').find('img').attr('src')
            let link = $(this).find('article').find('a').attr('href')
            link = link.replace(/^[/]/,"")
            link = sourceUrl + link
            let dateTime = $(this).find('article').find('a').find('div').find('span:nth-child(2)').text()
            dateTime = dateTime.replace(/^,\s/,"")
            engadget.push({title,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectGReview(){
    const sourceName = 'GadgetReview'
    const sourceUrl = sources.gadgetreview + 'tech-deals'
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.u-col',html).each(function(){
            let title = $(this).find('h3').text()
            title = title.replace(/^\n\t+\n\t+/,"")
            title = title.replace(/\t+\n\t+$/,"")
            let img = $(this).find('a').attr('style')
            if(img==undefined) return
            img = img.replace(/^background-image:url[(]'/,"")
            img = img.replace(/'[)];$/,"")
            const link = $(this).find('a').attr('href')
            gadgetReview.push({title,img,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectTRadar(){
    const sourceName = 'TechRadar'
    const sourceUrl = sources.techradar + 'in/news'
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.small',html).each(function(){
            const title = $(this).find('a').find('article').find('.content').find('h3').text().trim()
            if(title=='') return
            const img = $(this).find('a').find('article').find('.image').find('img').attr('data-original-mos')
            const link = $(this).find('a').attr('href')
            const dateTime = $(this).find('a').find('article').find('.content').find('p').find('time').text()
            techrRadar.push({title,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connect9to5Mac(){
    const sourceName = '9to5Mac'
    const sourceUrl = sources.nineto5mac
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('article',html).each(function(){
            const title = $(this).find('.post-title').text()
            if(title=='') return
            const img = $(this).find('a').find('img').attr('src')
            const link = $(this).find('a').attr('href')
            let dateTime = $(this).find('.post-meta').find('.time-twitter').text()
            dateTime = dateTime.replace(/^\n\t+-\s/,"")
            dateTime = dateTime.replace(/\n\t+$/,"")
            nineto5Mac.push({title,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectAA(){
    const sourceName = 'Android Authority'
    const sourceUrl = sources.androidauthority + 'news'
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('a',html).each(function(){
            let title = $(this).find('.title-wrapper').text()
            title += $(this).find('.title').text()
            if(title=='') return
            const img = $(this).find('img').attr('src')
            let link = $(this).attr('href')
            link = sourceUrl + link
            androidAuthority.push({title,img,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}
function connectGSMA(){
    const sourceName = 'GSMArena'
    const sourceUrl = sources.gsmarena
    axios(sourceUrl)
    .then(response=>{
        const html = response.data
        const $ = cheerio.load(html)
        $('.news-item',html).each(function(){
            const title = $(this).find('a').find('h3').text()
            const para = $(this).find('a').find('p').text()
            const img = $(this).find('a').find('.news-item-media-wrap').find('img').attr('src')
            let link = $(this).find('a').attr('href')
            link = sourceUrl + link
            const dateTime = $(this).find('.meta-line').find('.meta-item-time').text()
            gsmarena.push({title,para,img,dateTime,link})
            allNews.push({title,img,link,sourceName})
        })
    })
    .catch(err=>console.log(err))
}

app.listen(port, ()=>console.log(`server listening on port ${port}`))