'use strict'

app.controller('ImageController', function($scope, $http, APIHOST){

  let vm = this

  vm.Images = []

  vm.getImages = function() {
    $http({
      method: 'GET',
      url: APIHOST + '/files/retrieve/' + localStorage.getItem('userId')
    }).then(function(response){
      console.log(response.data)
      vm.Images = response.data
    })
  }

  document.onpaste = function(event){
    let items = (event.clipboardData || event.originalEvent.clipboardData).items   

    let blob = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile();
      }
    }

    if (blob !== null) {
      let reader = new FileReader()
      reader.onload = function(event) {
        vm.LOADING = true
        $http({
          method: 'POST',
          url: '/files/upload',
          data: {
            base64: event.target.result.split(',')[1],
            extension: 'png',
            _userId: localStorage.getItem('userId')
          }
        }).then(function(response){
          console.log(response.data)
          vm.seuLink = response.data.url
          vm.urlImagem = response.data.url
          vm.LOADING = false
        })

        /*
        $http({
          method: 'POST',
          //url: 'https://api.imgur.com/3/image',
          url: '/files/upload',
          // headers: {
          //   Authorization: 'Client-ID 2e4460f98f2549e'
          // },
          data: {
            //image: event.target.result.split(',')[1]
            base64: event.target.result.split(',')[1],
            extension: 'png'
          }
        }).then(function(ret){
          $http({
            method: 'POST',
            url: APIHOST + '/images/create',
            data: {
              _userId: localStorage.getItem('userId'),
              urlImage: ret.data.link
            }
          }).then(function(ret2){
            vm.LOADING = false
            vm.seuLink = ret.data.link
            vm.urlImagem = ret.data.link
            // vm.seuLink = ret.data.data.link
            // vm.urlImagem = ret.data.data.link
          })

        })
        */
      }
      reader.readAsDataURL(blob)
    }
  }

})