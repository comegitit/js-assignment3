window.addEventListener('load', () => {
  //let lat
  let lat ='instantiation'
  //let long
  let long = 'instantiation'
  let temperatureDegree = document.querySelector('.temperature-degree')
  let temperatureDescription = document.querySelector('.temperature-description')
  let locationTimezone = document.querySelector('.location-timezone')

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      long = position.coords.longitude

      //proxy workaround for browser CORS policy restrictions
      const proxy = "https://cors-anywhere.herokuapp.com/"
      //also added query string to return units (celsius) relevant to Canadian users
      const api = `${proxy}https://api.darksky.net/forecast/22dc744c9e56c0455e206506c8a258f4/${lat},${long}/?units=si`


      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          //console.log(data)
          const {temperature, summary, icon}=data.currently

          //Set DOM elements from the API
          temperatureDegree.textContent = Math.round(temperature)
          temperatureDescription.textContent = summary
          locationTimezone.textContent = data.timezone
          //Set the Skycon icon
          setIcons(icon, document.querySelector('.icon'))
        })
    })

  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({color:'white'})

    //replace dashes with underscores, convert to upper case
    const currentIcon = icon.replace(/-/g,"_").toUpperCase()
    skycons.play()
    return skycons.set(iconID, Skycons[currentIcon])
  }
  // else{
  //   h1.textContent = "Please allow location access. It's used only for the purposes of this weather app"
  // }
})