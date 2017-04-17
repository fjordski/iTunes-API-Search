$('#button').click(function() {

    getAlbums();
    
      function getAlbums(){
      
      $('#results').empty();
      $('#albumSelect').empty();
      
      //artist name
      let search = document.querySelector('#search').value;
      //search based on artist name
      $.getJSON('https://itunes.apple.com/search?term=' + encodeURI(search), function(data) {
          let artistId = data.results[0].artistId;

          //append albums to select
          $.getJSON('https://itunes.apple.com/lookup?id=' + artistId + '&entity=album', function(data) {

              let collectionIds = [];
              $.each(data, function(i, item) {
                  for (var i = 1; i < item.length; i++) {
                      collectionIds.push(item[i].collectionId);
                      $('#albumSelect').append('<option>' + item[i].collectionName + '</option>');
                  }
                  $('#albums').show();
                  console.log(collectionIds);
              });

              $('#albumSelect').on('change', function() {
                  let thisAlbum = ($('#albumSelect').prop('selectedIndex'));
                  //look up by collectionId
                  $.getJSON('https://itunes.apple.com/lookup?id=' + collectionIds[thisAlbum] + '&entity=song', function(data) {
                      $('#results').empty();
                      let template = `
                        <div class="wrapper">
                          <h4 class="text-center">${data.results[0].artistName}</h4>
                              <a href="${data.results[0].collectionViewUrl}" target="_blank"><img class="center-block" src="${data.results[0].artworkUrl100}"/></a>
                          <p>${data.results[1].trackName}</p>  
                          <audio controls>
                            <source src="${data.results[1].previewUrl}" type="audio/mpeg">
                            Your browser does not support the audio element.
                          </audio>
                          <p>${data.results[2].trackName}</p>  
                          <audio controls>
                            <source src="${data.results[2].previewUrl}" type="audio/mpeg">
                            Your browser does not support the audio element.
                          </audio>
                          <p>${data.results[3].trackName}</p>  
                          <audio controls>
                            <source src="${data.results[3].previewUrl}" type="audio/mpeg">
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        `;
                     $('#results').append(template).hide().fadeIn();
                  });
              });
          });
      });
    }
});
