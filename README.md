# Web scraper API - Tech related news from top 12 websites
Build using Node.js, express and cheerio, this API will give tech news from top websites including 
- TechCrunch
- Gizmodo 
- The Verge 
- VentureBeat 
- Wired 
- Digital Trends
- engadget 
- Gadget Review 
- Tech Radar
- 9to5Mac
- Android Authority
- GSMArena
## MOCK API Response
```json
[
  {
    "title": "FarmRaise aims to become a financial services giant, starting with farm grants",
    "img": "https://techcrunch.com/wp-content/uploads/2022/01/Founders-1.jpg?w=300&h=160&crop=1",
    "dateTime": "Jan 21, 2022",
    "link": "https://techcrunch.com/2022/01/21/farmraise-aims-to-become-a-financial-services-giant-starting-with-farm-grants/"
  },
  {
    "title": "Google asks a judge to dismiss Texas antitrust lawsuit about its ad business",
    "img": "https://techcrunch.com/wp-content/uploads/2021/07/GettyImages-1207206237.jpg?w=300&h=160&crop=1",
    "dateTime": "Jan 21, 2022",
    "link": "https://techcrunch.com/2022/01/21/google-asks-a-judge-to-dismiss-texas-antitrust-lawsuit-about-its-ad-business/"
  },
  {
    "title": "2022 crypto predictions from Prime Trust CFO Rodrigo Vicuna",
    "img": "https://techcrunch.com/wp-content/uploads/2022/01/GettyImages-1253985676.jpg?w=300&h=160&crop=1",
    "dateTime": "Jan 21, 2022",
    "link": "https://techcrunch.com/2022/01/21/2022-crypto-predictions-from-prime-trust-cfo-rodrigo-vicuna/"
  }
]
```
## Features 
- API result includes a tyitle of the news, cover image url, lin to the aricle/site and date.
> Not all sources includes dates, some website don't display date. 
> Images from different websites may have different aspect ratio.
- API have seperate endpoints for each source(website), user can use the website name at the end of the api to get only news from that perticular site.
