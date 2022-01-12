window.onload = (event) => {
    var map = L.map('map');
    let formSearch = document.getElementById('form');
    fetchTiles();
    formSearch.addEventListener('submit', function(event) {
        event.preventDefault();
        fetchTiles(formSearch['ip-adress-input'].value);
    })

    function fetchTiles(ip) {
        const ipAdress = ip ? `&ipAddress=${ip}` : '';
        fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_YBqhHBgr2KR2959CiNwqm2MdOn1f3${ipAdress}`)
            .then(response => {
                return response.json();
            }).then(result => {
                document.getElementById("add").innerHTML = result.ip;
                document.getElementById("loc").innerHTML = result.location.country;
                document.getElementById("tm").innerHTML = result.location.timezone;
                document.getElementById("sp").innerHTML = result.isp;
                map.setView([result.location.lat, result.location.lng], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoianVuaW9yODA5MCIsImEiOiJja3k5dmp1MzIwYTZwMnBwZGs4azlwYnh1In0.IQwJzm131eSpRiIY6G6OaA'
                }).addTo(map);

            })
            .catch(err => alert('Sorry An Error Occured...'));
    }

}