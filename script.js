var rest = fetch("https://restcountries.com/v3.1/all")
  .then((data)=>(data.json())).then((data1)=>foo(data1));


  var container = document.createElement("div");
  container.className = "container";

  var row = document.createElement("div");
  row.className = "row";

  function foo(data1){
     console.log(data1);
      for(var i=0;i<data1.length;i++){
          var col = document.createElement("div");
          col.className = "col-lg-4 ";
          col.innerHTML = `<div class="card border-light mb-3" style="max-width: 18rem;">
          <div class="card-header p-3 mb-2 bg-dark text-white" ><b>${data1[i].name.common}</b></div>
          <div class="card-body text-danger text-center">
            <img src="${data1[i].flags.png}" class="card-img-top" alt="...">
            <p class="card-text">Capital : ${data1[i].capital}</p>
            <p class="card-text">Region : ${data1[i].region}</p>
            <p class="card-text">Country Code : ${data1[i].cca3}</p>
            <p class="card-text">Latitude : ${data1[i].latlng[0]}</p>
            <p class="card-text">Longitude : ${data1[i].latlng[1]}</p>
            <button class = "weather-button">click for weather</button>
            <p id="demo-${i}"></p>
            </div>
        </div>`
        row.append(col);       
      }
     
      container.append(row);
      document.body.append(container);

      document.querySelectorAll('.weather-button')
      .forEach((button, index) => {
          button.addEventListener('click', function() {
                var ll = data1[index].latlng;
                bar(...ll,index);
          });
      });

      function bar(lat,lon,index){
        var final_res = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=92ffb8d2aed8a55730c918a92984fa75`)
          .then((data2)=>(data2.json())).then((data3)=>{
            var temperature = data3.main.temp;
            document.getElementById(`demo-${index}`).innerHTML = `Temp : ${temperature}`;
      })
}
}