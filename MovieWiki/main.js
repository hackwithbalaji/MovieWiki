
let countries;
function movie()
{   
document.body.style.backgroundColor = "black";  
document.getElementById("heading").style.color="white";
let name=document.getElementById("mname").value;
fetch('http://www.omdbapi.com/?apikey=793c1eec&s='+name)
.then(res =>  res.json())
.then(data => initialize(data))
.catch(err => alert("Enter Valid Movie Name"+err));
}
function initialize(countriesData) 
{
  countries = countriesData.Search;
  let options = "";
   for(let i=0; i<countries.length; i++) {

      options+=`<div id="card" onclick="op('${countries[i].imdbID}')">
                <img src="${countries[i].Poster}" style="width:100%; >
                   <div id="container">
                    <h4> ${countries[i].Title}</h4>
                    </div>
                 </div> `;

   }
   document.getElementById("gridcontainer").innerHTML=options;
}

  function op(val) {
    sessionStorage.setItem("imdbID",val);
    window.location = "info.html";
  }
  function info()
  {
    ID=sessionStorage.getItem("imdbID");
    document.getElementById("info1").innerText=ID;
    fetch('http://www.omdbapi.com/?apikey=793c1eec&i='+ID)
    .then(res => res.json())
    .then(data => 
    {
     movie=data;
     let lists="";
     lists=`<div>
           <div> <img src="${movie.Poster}" ></img></div>   
           <p><span style="font-weight:bold;font-size:35px;"> ${movie.Title}</span> <a href="index.html" id="previous">&laquo; Previous</a> 
           <a href="http://imdb.com/title/${movie.imdbID}" id="imdbbutton">View IMDB</a></p>
           <div id="column"><ul>
             <li> Release data : ${movie.Released}</li>
             <li> Cast : ${movie.Actors}</li>
             <li> Director : ${movie.Director}</li>
             <li> Writer :  ${movie.Writer}</li>
             <li> Genre : ${movie.Genre}</li>
             <li> Language : ${movie.Language}</li>
             <li> Awards : ${movie.Awards}</li>
            </ul> </div>
            </div>`;
     document.getElementById("info1").innerHTML=lists;})
  }
  
