// const API_KEY = "4070d4803d6e46798ead7e9e55675510";
const BASE_URL = "https://api.kawalcorona.com/";

const PARAMETER = 'indonesia';

const CORONA_INDO = `${BASE_URL}/${PARAMETER}`;
const CORONA_INDO_PROV = `${BASE_URL}/${PARAMETER}/provinsi`;
// const TIM_FAVORIT = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;


const fetchAPI = url => {
  return fetch(url, {

  })
  .then(res => {
    if (res.status !== 200) {
      console.log("Error: " + res.status);
      return Promise.reject(new Error(res.statusText))
    } else {
      return Promise.resolve(res)
    }
  })
  .then(res => res.json())
  .catch(err => {
    console.log(err)
  })
};

function getCovINA() {
  if ("caches" in window) {
    caches.match(CORONA_INDO).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("COVID INA Data: " + data);
          show_COV_INDO(data);
        })
      }
    })
  }

  fetchAPI(CORONA_INDO)
  .then(data => {
    show_COV_INDO(data);
    console.log(data);
  })
  .catch(error => {
    console.log(error)
  })
}

function show_COV_INDO(data) {
  let covind = "";
  let covsemind = "";
  let covmenind = "";

  let CovIndoElement =  document.getElementById("covPosIndo");
  let CovIndoSemElement =  document.getElementById("covSemIndo");
  let CovIndoMenElement =  document.getElementById("covMenIndo");



  data.forEach(function (covidindo) {
    covind += `
    <h4>${covidindo.positif}</h4>
    `;
    covsemind += `
    <h4>${covidindo.sembuh}</h4>
    `;
    covmenind += `
    <h4>${covidindo.meninggal}</h4>
    `;
  });

  CovIndoElement.innerHTML = `
  <div class="col s12 m4">
  <div class="card blue">
  <div class="card-content white-text">
  <span class="card-title">Terkonfirmasi
  <img src="image/search.png" width="50" class="pull-right">
  </span>

  ${covind}

  </div>
  </div>
  </div>
  `;

  CovIndoSemElement.innerHTML = `
  <div class="col s12 m4">
  <div class="card green">
  <div class="card-content white-text">
  <span class="card-title">Sembuh
  <img src="image/patient.png" width="50" class="pull-right">
  </span>

  ${covsemind}

  </div>
  </div>
  </div>
  `;

  CovIndoMenElement.innerHTML = `
  <div class="col s12 m4">
  <div class="card red">
  <div class="card-content white-text">
  <span class="card-title">Meninggal
  <img src="image/death.png" width="50" class="pull-right">
  </span>

  ${covmenind}

  </div>
  </div>
  </div>
  `;
}

function getCovINAProv() {
  if ("caches" in window) {
    caches.match(CORONA_INDO_PROV).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log("Data Covid Indonesia Provinsi: " + data);
          show_COV_INDO_PROV(data);
        })
      }
    })
  }

  fetchAPI(CORONA_INDO_PROV)
  .then(data => {
    show_COV_INDO_PROV(data);
    console.log(data);
  })
  .catch(error => {
    console.log(error)
  })
}


  function show_COV_INDO_PROV(data) {
    let covinaprovs = "";
    let covinaprovElement =  document.getElementById("CovIndProv");
    var no = 1;
    data.forEach(function (covinaprov) {
      covinaprovs += `
      <tr>
      <td>${no++}</td>
      <td>${covinaprov.attributes.Provinsi}</td>
      <td>${covinaprov.attributes.Kasus_Posi}</td>
      <td>${covinaprov.attributes.Kasus_Semb}</td>
      <td>${covinaprov.attributes.Kasus_Meni}</td>
      </tr>
      `;
    });

    covinaprovElement.innerHTML = `
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

    <table class="striped  responsive-table">
    <thead>
    <tr>
    <th>No</th>
    <th>Provinsi</th>
    <th>Positif</th>
    <th>Sembuh</th>
    <th>Meninggal</th>
    </tr>
    </thead>
    <tbody id="covinaprovs">
    ${covinaprovs}
    </tbody>
    </table>

    </div>
    `;
  }


  function showNobar() {
    let nobarElement =  document.getElementById("nobarIndexdb");

    nobarElement.innerHTML = `
    <form>
    <label for="nobarId">Id Nobar: </label><input id="nobarId" type="number">
    <label for="nobarName">Pertandingan:  </label > <input id="nobarName" type="text">
    <label for="nobarWaktu">Waktu Nobar: </label><input id="nobarWaktu" type="text">
    <label for="nobarTempat">Tempat Nobar: </label><input id="nobarTempat" type="text">
    <a class="waves-effect waves-light btn" id="save"><i class="material-icons left">save</i>Simpan</a>
    </form>
    <div>
    <table>
    <thead>
    <tr>
    <th>Id Nobar</th>
    <th>Pertandingan</th>
    <th>Pukul</th>
    <th>Tempat</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody id="nobarsRow"></tbody>
    </table>
    </div>
    `;
    document.addEventListener("DOMContentLoaded", function () {

    });

    var save = document.getElementById("save");

    const nobarsRow = document.querySelector("#nobarsRow");
    const inputNobarId = document.querySelector("#nobarId");
    const inputNobarName = document.querySelector("#nobarName");
    const inputNobarWaktu = document.querySelector("#nobarWaktu");
    const inputNobarTempat = document.querySelector("#nobarTempat");

    save.onclick = function () {
      console.log("Tombol Save di klik.");
      insertNobar();
    }

    function insertNobar() {
      const nobar = {
        nobarId: inputNobarId.value,
        nobarName: inputNobarName.value,
        nobarWaktu: inputNobarWaktu.value,
        nobarTempat: inputNobarTempat.value
      };

        // console.log(nobar);

        dbInsertNobar(nobar).then(() => {
          showAllNobar()
        })
      }

      function showAllNobar() {
      // let nobarsRow = "";
      var content = document.getElementById('nobarsRow').innerHTML;
      // alert(content);
      dbGetAllNobar().then(nobars => {
       let listNobarsInText = "";
       nobars.forEach(nobar => {
         listNobarsInText += `
         <tr>
         <td>${nobar.nobarId}</td>
         <td>${nobar.nobarName}</td>
         <td>${nobar.nobarWaktu}</td>
         <td>${nobar.nobarTempat}</td>
         <td><button id="${nobar.nobarId}" class="removeButton">Remove</button></td>
         </tr>
         `;
       });
       nobarsRow.innerHTML = listNobarsInText;

       let removeButtons = document.querySelectorAll(".removeButton");
       for(let button of removeButtons) {
         button.addEventListener("click", function (event) {
           let nobarId = event.target.id;
           dbDeleteNobar(nobarId).then(() => {
             showAllNobar()
           })
         })
       }
     })
    }

    showAllNobar()
  }


