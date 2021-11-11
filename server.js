const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

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

app.use(express.static(__dirname));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/:news", (req,res)=>{
    const allSource = req.params.news
    if(allSource=='news'){
        res.json(allNews)
    }
    else{
        res.sendFile(__dirname + "/error404.html")
    }
})

app.get("/:news/:sourceId", async (req,res)=>{
    const parentId = req.params.news
    const sourceId = req.params.sourceId
    //GSMArena
    if(sourceId=='gsmarena' && parentId=='news'){
        const sourceUrl = sources.gsmarena
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                const titles = $(this).find('a').find('h3').text()
                const para = $(this).find('a').find('p').text()
                const img = $(this).find('a').find('.news-item-media-wrap').find('img').attr('src')
                let link = $(this).find('a').attr('href')
                link = sourceUrl + link
                const dateTime = $(this).find('.meta-line').find('.meta-item-time').text()
                specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //AndroidAuthority
    else if(sourceId=='androidauthority' && parentId=='news'){
        const sourceUrl = sources.androidauthority+'news'
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('a',html).each(function(){
                let titles = $(this).find('.title-wrapper').text()
                titles += $(this).find('.title').text()
                if(titles=='') return
                const img = $(this).find('img').attr('src')
                let link = $(this).attr('href')
                link = sourceUrl + link
                specificNews.push({titles,img,link})
            })
            res.json(specificNews)
            console.log(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //The Verge
    else if(sourceId=='verge' && parentId=='news'){
        const sourceUrl = sources.verge+'tech'
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.c-entry-box--compact--article',html).each(function(){
                const titles = $(this).find('.c-entry-box--compact__title').text()
                let img = $(this).find('noscript').text()
                img = img.replace(/^<img\salt=\"\"\ssrc=\"/, "")
                img = img.replace(/\">$/,"")
                const link = $(this).find('.c-entry-box--compact__title').find('a').attr('href')
                const dateTime = $(this).find('time').text().trim()
                specificNews.push({titles,img,link,dateTime})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //Gizmodo
    else if(sourceId=='gizmodo' && parentId=='news'){
        const sourceUrl = sources.gizmodo
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //techradar
    else if(sourceId=='techradar' && parentId=='news'){
        const sourceUrl = sources.techradar
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //engadget
    else if(sourceId=='engadget' && parentId=='news'){
        const sourceUrl = sources.engadget
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //9to5Mac
    else if(sourceId=='nineto5mac' && parentId=='news'){
        const sourceUrl = sources.nineto5mac
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //GadgetReview
    else if(sourceId=='gadgetreview' && parentId=='news'){
        const sourceUrl = sources.gadgetreview
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //digitaltrends
    else if(sourceId=='digitaltrends' && parentId=='news'){
        const sourceUrl = sources.digitaltrends
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //Wired
    else if(sourceId=='wired' && parentId=='news'){
        const sourceUrl = sources.wired
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //TechCrunch
    else if(sourceId=='techcrunch' && parentId=='news'){
        const sourceUrl = sources.techcrunch
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    //VentureBeat
    else if(sourceId=='venturebeat' && parentId=='news'){
        const sourceUrl = sources.venturebeat
        axios(sourceUrl)
        .then(response=>{
            const specificNews = []
            const html = response.data
            const $ = cheerio.load(html)
            $('.news-item',html).each(function(){
                // const titles = $(this).
                // const para = $(this).
                // const img = $(this).
                // let link = $(this).
                // link = sourceUrl + link
                // const dateTime = $(this)
                // specificNews.push({titles,para,img,dateTime,link})
            })
            res.json(specificNews)
        })
        .catch(err=>console.log(err))
    }
    else{
        res.sendFile(__dirname + "/error404.html")
    }
})

app.listen(port, ()=>console.log(`server listening on port ${port}`))