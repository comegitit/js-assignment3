window.addEventListener('load', () => {

  let lat = 'instantiation'
  let long = 'instantiation'
  const tempInDegrees = document.querySelector('.temp-in-degrees')
  const ConditionsDescription = document.querySelector('.conditions-description')
  const locationTimezone = document.querySelector('.location-timezone')

  //use built-in javascript functionality to fetch lat & long
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude
    long = position.coords.longitude

    //proxy workaround for browser CORS policy restrictions
    const proxy = "https://cors-anywhere.herokuapp.com/"
    //using 'Dark Sky' API with query string for metric units (celsius)
    const api = `${proxy}https://api.darksky.net/forecast/22dc744c9e56c0455e206506c8a258f4/${lat},${long}/?units=si`

    //fetch API data & convert to JSON
    fetch(api)
      .then(response => {
        return response.json()
      })

      .then(data => {
        //console.log(data). Leave here for future testing purposes

        const {temperature, summary,icon
        } = data.currently

        tempInDegrees.textContent = Math.round(temperature)
        ConditionsDescription.textContent = summary
        locationTimezone.textContent = data.timezone

        //Set the Skycon icon
        setIcons(icon, document.querySelector('.icon'))
      })
  })

  function setIcons(icon, iconId) {
    const skycons = new Skycons({
      color: 'white'
    })

    //replace dashes with underscores, convert to upper case
    const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    //animate 
    skycons.play()

    return skycons.set(iconId, Skycons[currentIcon])
  }

})