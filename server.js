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

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.get("/:sourceId", async (req,res)=>{

    const sourceId = req.params.sourceId

    if(sourceId=='gsmarena'){
        const sourceUrl = sources.gsmarena
        const gsmarena = []
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
            })
            res.json(gsmarena)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='androidauthority'){
        const sourceUrl = sources.androidauthority
        const androidAuthority = []
        axios(sourceUrl)
        .then(response=>{
            const html = response.data
            const $ = cheerio.load(html)
            $('a',html).each(function(){
                const title = $(this).find('.te').text()
                if(title=='') return
                const img = $(this).find('img').attr('src')
                let link = $(this).attr('href')
                link = sourceUrl + link
                androidAuthority.push({title,img,link})
            })
            $('a',html).each(function(){
                const title = $(this).find('.wi').text()
                if(title=='') return
                const img = $(this).find('img').attr('src')
                let link = $(this).attr('href')
                link = sourceUrl + link
                androidAuthority.push({title,img,link})
            })
            res.json(androidAuthority)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='verge'){
        const sourceUrl = sources.verge + 'tech'
        const verge = []
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
            })
            res.json(verge)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='gizmodo'){
        const sourceUrl = sources.gizmodo + 'tech'
        const gizmodo = []
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
            })
            res.json(gizmodo)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='techradar'){
        const sourceUrl = sources.techradar + 'in/news'
        const techrRadar = []
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
            })
            res.json(techrRadar)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='engadget'){
        const sourceUrl = sources.engadget
        const engadget = []
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
            })
            res.json(engadget)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='nineto5mac'){
        const sourceUrl = sources.nineto5mac
        const nineto5Mac = []
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
            })
            res.json(nineto5Mac)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='gadgetreview'){
        const sourceUrl = sources.gadgetreview + 'tech-deals'
        const gadgetReview = []
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
            })
            res.json(gadgetReview)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='digitaltrends'){
        const sourceUrl = sources.digitaltrends
        const digitalTrends = []
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
            })
            $('.b-snippet',html).each(function(){
                let title = $(this).find('h3').text()
                if(title=='') return
                title = title.replace(/^\n\t+/,"")
                title = title.replace(/\n\t+$/,"")
                const img = $(this).find('.b-snippet__image').find('img').attr('data-dt-lazy-src')
                const link = $(this).find('h3').find('a').attr('href')
                digitalTrends.push({title,img,link})
            })
            res.json(digitalTrends)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='wired'){
        const sourceUrl = sources.wired + 'category/artificial-intelligence/'
        const wired = []
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
            })
            res.json(wired)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='techcrunch'){
        const sourceUrl = sources.techcrunch
        const techCrunch = []
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
            })
            res.json(techCrunch)
        })
        .catch(err=>console.log(err))
    }

    else if(sourceId=='venturebeat'){
        const sourceUrl = sources.venturebeat
        const ventureBeat = []
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
            })
            res.json(ventureBeat)
        })
        .catch(err=>console.log(err))
    }

    else{
        res.sendFile(__dirname + "/error404.html")
    }

})

app.listen(port, ()=>console.log(`server listening on port ${port}`))