// When the page has loaded...
$(document).ready(function() {
  // API app ID and key from signing up for Edamam API
 const appID = 'eb9648a9';
 const appKey = 'c71cce33bf4296e6d71e74dbaee335c0';
 let searchIndex = 0;
//When the search button is clicked on...
 $('.search').click(function() {
     $("div.recipe-results").empty();
   $(`<div class="row loading-container">
<div class="col s6 offset-s6   "><img class="loading" src="images/spinner.gif" /></div>
   </div>`).insertAfter('.recipe-results');
   // get the value of whatever is inside the search box
  let searchQuery = $('#search').val();
  // new array to hold recipes
  let recipes = [];
  searchAPI(searchQuery, searchIndex, searchIndex+=24).then(function(result) {
    //put recipe object information into recipes array
   for (let i = 0; i < result.hits.length; i++) {
    recipes.push(result.hits[i].recipe);
   }
   //Stores the array of recipes into localStorage as a String
   localStorage.setItem('recipes', JSON.stringify(recipes));

   for (let j = 0; j < recipes.length; j++) {


    let recipeCard = $(`
<div id=${j} class="col s2 recipe-card"><div class="card">
        <div id=${j} class="card-image">
          <img id=${j} src=${recipes[j].image}>
        </div>
        <div id=${j} class="card-content">
          <p id=${j}>${recipes[j].label}</p>
        </div>
      </div></div>


<div id=${j} class="col s2 recipe-card">
<div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class = "activator" id=${j} src=${recipes[j].image}>
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4"><p id=${j}>${recipes[j].label}</p><i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4"><p id=${j}>${recipes[j].label}</p><i class="material-icons right">close</i></span>
      <p>Here is some more information about this product that is only revealed once clicked on.</p>
    </div>
  </div>`);
    $('.recipe-results').append(recipeCard);
   }
   $('.loading-container').remove();
   $('.recipe-card').click(function(e) {
    localStorage.setItem('recipeIndex', e.target.id);
    //window.location.href = 'recipe.html';
   })

  })
 })

//Return the results from Edamam API with the search query
 function searchAPI(query, from, to) {
  return $.ajax('https://api.edamam.com/search', {
   data: {
    app_id: appID,
    app_key: appKey,
    q: query,
    from: from,
    to: to
   }
  }).done(function(data) {
   return data;
  })
 }




})
