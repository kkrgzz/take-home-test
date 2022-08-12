let wordpressURL = 'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json';

/**
 * Converts the month number to name of month.
 * @param {number} monthNumber 
 * @returns {string}
 */
function monthConverter(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString(['en-US'], {
      month: 'long',
    });
}

/**
 * Converts GMT date type into array
 * @param {string} dateString 
 * @returns {array}
 */
function dateConverter(dateString){
    let date = new Date(dateString);
    return date.toISOString().split('T')[0].split("-");
}

$.getJSON(wordpressURL, function(data) {
    data.forEach(blogPost => {
        // Checks for is post tag determined
        let postTag = "Not Specified";
        if (blogPost['_embedded']['wp:term'][2].length != 0){
            postTag = blogPost['_embedded']['wp:term'][2][0]['name'];
        }

        let image = blogPost['featured_media'];
        let title = blogPost['title']['rendered'];
        let postLink = blogPost['link'];
        let authorName = blogPost['_embedded']['author'][0]['name'];
        let authorLink = blogPost['_embedded']['author'][0]['link'];
        let date = blogPost['date'];

        // Checks for is post type Article
        let postType = "Not Specified";
        if (blogPost['_embedded']['wp:term'][0][0]['name'] === "Articles"){
            postType = "Article";
        }

        let day = dateConverter(date)[2];
        let month = monthConverter(dateConverter(date)[1]);
        let year = dateConverter(date)[0];
        
        // Returns all JSON data into html card element
        $("#blog-posts").append(`
            <div class="col-4 u-equal-height">
                <div class="p-card--highlighted">
                    <header class="p-card__header">
                        <h5 class="p-muted-heading u-no-margin-bottom">
                            ${postTag}
                        </h5>
                    </header>
                    <div class="p-card__content">
                        <div class="u-crop--16-9">
                            <a href="${postLink}">
                                <img src="${image}" alt class="p-card_image">
                            </a>
                        </div>
                        <h3 class="p-heading--4">
                            <a href="${postLink}">${title}</a>
                        </h3>
                        <p>
                            <em>
                            by <a href="${authorLink}">${authorName}</a> 
                            on ${day} ${month} ${year}</em>
                        </p>
                    </div>
                    <p class="p-card__footer">${postType}</p>
                </div>
            </div>
        `); // Append
    }); // Foreach
}); // getJSON
