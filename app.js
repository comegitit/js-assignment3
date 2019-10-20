window.addEventListener('load', () => {
  let lat ='instantiation'
  let long = 'instantiation'
  const tempInDegrees = document.querySelector('.temp-in-degrees')
  const SummaryDescription = document.querySelector('.summary-description')
  const locationTimezone = document.querySelector('.location-timezone')

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
          tempInDegrees.textContent = Math.round(temperature)
          SummaryDescription.textContent = summary
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

})