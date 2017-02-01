# Touch light
_Change color when your friend touches the lamp_

## Description
Some close friends and I were tagged in a share of this Buzzfeed video [Stay Connected Long Distance With These Wi-Fi Touch Lamps](https://www.facebook.com/BuzzFeedDIY/videos/1112215132239051/), and I thought it was a very sweet idea. The video was basically a commercial for the [Filimin](http://filimin.com/), so credits to the inventor John.

From the Filimin website:
>Sometimes it's difficult to tell someone you love them.
>A text, email or phone call are all nice, but often they're just not enough. We all desire something more: a hug; a presence; something simple, mindful and "beyond words."
>So we created Filimin. Filimins are decorative touch lights that connect you with those you love.

I thought it would make for a fun little project to finally deploy something to the Heroku account I've had around for years. This just runs in the browser and not on a cool lamp connected to wifi, and anyone with the URL can connect. Enter your name, choose a color, and you can "touch" the "lamp" by clicking or tapping the page.

## Run
You need node and npm to run this locally:
```
npm install
node app.js
```

To deploy to heroku:
```
git push heroku master
```