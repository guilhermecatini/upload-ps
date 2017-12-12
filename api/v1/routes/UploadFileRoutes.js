const express = require('express')
const router = express.Router()
const fs = require('fs')
const UploadFileModel = require('../models/UploadFileModel')

function callback(res, err, data, status = 200) {
  if (err) return res.status(500).json(err)
    return res.status(status).json(data)
}

function generateFileId() {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text;
}

router.post('/upload', (req, res) => {

  const serverUrl = '//'+req.headers.host

  const base64       = req.body.base64
  const extension    = req.body.extension

  const uploadFolder = './files/upload/'
  const fileName     = generateFileId() + '.' + extension
  const completePath = uploadFolder + fileName

  const inf = {
    url: '/files/upload/'+fileName,
    fileKey: fileName,
    extension: extension
  }


  fs.writeFile(completePath, base64, 'base64', function(){

    UploadFileModel.create(inf, (err,data) => {
      res.json( { link : serverUrl + inf.url } )
    })
    
  })

})


module.exports = router