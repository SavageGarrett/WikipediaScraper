const puppeteer = require('puppeteer')
const fs = require('fs')

let link = "https://wikipedia.org/"

void (async () => {
  try {
    // Create Browser
    const browser = await puppeteer.launch({headless: false, devtools: false})

    // Create Login Page
    const page = await browser.newPage()

    // Intercept Costly Resources
    await page.setRequestInterception(false)
    page.on('request', (req) => {
      if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
          req.abort()
      }
      else {
          req.continue()
      }
    })

    // Go to Login Page
    await page.goto('https://accelerate.masschallenge.org/applicant/', {
      waitUntil: 'networkidle2'
    })
  
    // Email
    await page.waitForSelector("[id='id_email']")
    await page.type("[id='id_email']", email)

    // Password
    await page.keyboard.down("Tab")
    await page.keyboard.type(pass)

    // Finish login
    await page.keyboard.down("Tab")
    await page.keyboard.down("Enter")

    // Close Login Page
    await page.close()

    //await browser.close()
  } catch (error) {
    console.log(error)
  }
})()