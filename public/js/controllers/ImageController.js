'use strict'

app.controller('ImageController', function($scope, $http, APIHOST){

  let vm = this

  vm.Images = []

  vm.getImages = function() {
    $http({
      method: 'GET',
      url: APIHOST + '/images/retrieve/' + localStorage.getItem('userId')
    }).then(function(ret){
      vm.Images = ret.data
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
          url: 'https://api.imgur.com/3/image',
          headers: {
            Authorization: 'Client-ID 2e4460f98f2549e'
          },
          data: {
            image: event.target.result.split(',')[1]
          }
        }).then(function(ret){
          $http({
            method: 'POST',
            url: APIHOST + '/images/create',
            data: {
              _userId: localStorage.getItem('userId'),
              urlImage: ret.data.data.link
            }
          }).then(function(ret2){
            vm.LOADING = false
            vm.seuLink = ret.data.data.link
            vm.urlImagem = ret.data.data.link
          })
        })
      }
      reader.readAsDataURL(blob)
    }
  }

})