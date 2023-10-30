# API-Documentation-App

This project is a simplified feel of Swagger, which helps you test APIs in your ExpressJS project with a GUI interface.

## Setup

1. Download zip and extract locally. Open with your text editor software.
2. In the terminal, navigate to the root directory of API-Documentation where you see index.html. Run `npm i` to install dependencies.
3. Open api.json file (example template) to provide necessary information. <br>
   
   - `info.title` : Your project name
   - `info.description` : Your project description
   - `host`: Your ExpressJS project's domain address
   - `basePath`: Your project base route
   - `schemes`: Protocols your project uses (💡 array)
   - `paths`: (💡 array of objects)
     - `*endpoint*`: each endpoint that comes after `basePath`
     - `*HTTP method*`: get, post, put, or delete
     - `paths.*endpoint*.*HTTP method*.tags`: the purpose of this endpoint
     - `paths.*endpoint*.*HTTP method*.summary`: the summary of this endpoint
     - `paths.*endpoint*.*HTTP method*.parameters`: (💡 array of objects. 👉🏼if there is no parameter, skip.)
       - `name`: parameter name
       - `in`: parameter type (select from 3 types: query, path, body)
       - `required`: Boolean
       - `description`: the description of your parameter
     - `paths.*endpoint*.*HTTP method*.responses`: "*HTTP status code*": {"description":"*description of the HTTP status code*"}
    
4. If your ExpressJS project doesn't have [cors](https://expressjs.com/en/resources/middleware/cors.html) installed, `npm install cors` <br><br>
[Example of CORS configuration 1 - Allowing specific origin]
```
var express = require('express')
var cors = require('cors')
var app = express()

var corsOptions = {
  origin: '{API-Documentation-App's domain address, e.g., http://localhost:3001, the port number changes depending on which ports are in use}',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/products/:id', cors(corsOptions), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for only example.com.'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
```

 [Example of CORS configuration 2 - Enabling all CORS requests]
 ```
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

```
4. Start your ExpressJS project.
5. In the terminal, go to API-Documentation's root directory. run this command `npm start`, which should display all the configurations in api.json. Check domain address and confirm it's the same in `origin` value in corsOptions at Step3.


## Current Limitation
- HTTP methods avaialble are GET, POST, PUT, DELETE.
  
       
     
   



