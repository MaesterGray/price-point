import axios from 'axios'
import { extractCurrency, extractDescription,extractFirstNumber,removeDollarSign } from '../utils'
import * as cheerio from 'cheerio'
import {BRIGHT_DATA_PASSWORD,BRIGHT_DATA_USERNAME} from '$env/static/private'
export async function scrapeAmazonProduct(url:string){
    if(!url){
        return
    }

    const username = String(BRIGHT_DATA_USERNAME)
    const password = String(BRIGHT_DATA_PASSWORD)
    const port = 22225;
    const session_id = (1000000*Math.random())| 0

    const options = {
     auth:{ username:`${username}-session-${session_id}`,
        password,
        },
    host:'brd.superproxy.io',
    port,
    rejectUnauthorized:'false'
    }

    try {
        const response = await axios.get(url,options)
        const $ = cheerio.load(response.data)

        const title = $('#productTitle').text().trim()
        const currentPriceWhole = extractFirstNumber($('.a-price-whole').text().trim())
        const currentPriceFraction = $('.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay  .a-price-fraction').text().trim().slice(0,2)
        console.log(currentPriceFraction)
        const currentPrice = `${currentPriceWhole}.${currentPriceFraction}`
        let originalPrice = removeDollarSign($('.a-price.a-text-price > .a-offscreen').text())
        console.log(originalPrice)
        if(!originalPrice){
            originalPrice = currentPrice
        }
        const outOfStock = $('#availability span').text().trim().toLowerCase() ==='currently unavailable'
        const images = $('#imgBlkFront').attr('data-a-dynamic-image')||
        $('#landingImage').attr('data-a-dynamic-image')||'{}'
        const imageUrls = Object.keys(JSON.parse(images))
        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,"")
        const description = extractDescription($)
        const data = {
           url,
           currency: currency||'$' ,
           image:imageUrls[0],
           title,
           currentPrice: Number(currentPrice) || Number(originalPrice),
           originalPrice: Number(originalPrice) || Number(currentPrice),        
           priceHistory:[],
           discountRate:Number(discountRate),
           category:'category',
           reviewsCount:100,
           stars:4.5,
           isOutOfStock:outOfStock,
           description,      lowestPrice: Number(currentPrice) || Number(originalPrice),
           highestPrice: Number(originalPrice) || Number(currentPrice),
           averagePrice: Number(currentPrice) || Number(originalPrice),
        }
        return data
    } catch (error) {
        console.log(error)
        throw new Error(`Failed to scrape product:${error.message}`)
    }
}