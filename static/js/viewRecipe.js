// Get recipeId from url
var recipeId = location.search.substring(1);

// Recipe Dropdown
var dropDown = d3.selectAll('#recipe-dropdown')

d3.json(`/recipes`).then(d => {
    var recipes = []
    d.forEach(d => {
        recipes.push(
            {
                name: d['name'],
                id: d['id']
            }
        )
    });
    recipes.forEach(r => {
        var ddItem = dropDown.append('a')
        ddItem.text(r['name'])
            .attr("class", "dropdown-item")
            .attr("href", `/viewRecipe?${r['id']}`)
    })
});

getRecipe();

// variables for html elements
var recipeName = d3.selectAll('#recipe-name')
var recipeImage = d3.selectAll('#recipe-image')
var recipeDesc = d3.selectAll('#recipe-description')
var bustOutTable = d3.selectAll('#bust-out-table')
var ingredientsTable = d3.selectAll('#ingredients-table')
var staplesTable = d3.selectAll('#staples-table')
var recipeSteps = d3.selectAll("#recipe-steps")



// Get Recipe Data
function getRecipe() {
    d3.json(`/recipes/${recipeId}`).then(d => {
        // General Recipe
        // Title
        var title = recipeName.append('h1')
        title.text(d[0]['name'])

        // Image
        var image = recipeImage.append('img')
        image.attr("src", d[0]['image_url'])
            .attr("width", "100%")

        // Description
        var desc = recipeDesc.append('p')
        desc.text(d[0]['description'])
            .attr("class", "lead")

        // Variables for each piece of the data/
        var bustOutItems = d[0]['bust_out']
        var ingredients = d[0]['ingredients']
        var steps = d[0]['steps']
        // Sort step array by step number
        steps.sort((a, b) => (a.step > b.step) ? 1: -1)

        bustOutItems.forEach(e => {
            // Bust Out List
            if (e['qty'] === null) {
                var qty =  ""
            } else {
                var qty = `${e['qty']}`
            };
            if (e['unit'] === null) {
                e['unit'] = ""
            };
            var row = bustOutTable.append('tr')
            q = row.append('td')
            q.text(qty)
                .attr("style", "padding-left: 10px")
                .attr("style", "text-align: center")
            var unit = row.append('td')
            unit.text(e['unit'])
                .attr("style", "padding-left: 10px")
                .attr("style", "text-align: center")                       
            var item = row.append('td')
            item.text(e['item'])
                .attr("style", "padding-left: 10px")
        });

        // Separate staples and ingredients   
        var staples = [];
        var ingrs = [];
        ingredients.forEach(i => {
            if (i['staple']==true) {
                staples.push(i)
            } else {
                ingrs.push(i)
            };
        });

        // Staples Tables
        staples.forEach(s => {
            if (s['qty'] === null) {
                s['qty'] = ""
            };
            if (s['unit'] === null) {
                s['unit'] = ""
            };
            var row = staplesTable.append('tr')
            var q = row.append('td')
            q.text(s['qty'])
                .attr("style", "padding-left: 10px")
                .attr("style", "text-align: center")    
            var unit = row.append('td')
            unit.text(s['unit'])
                .attr("style", "padding-left: 10px")
                .attr("style", "text-align: center")    
            var ing = row.append('td')
            ing.text(s['ingredient'])
                .attr("style", "padding-left: 10px")
        });

        // Ingredients Tables
        ingrs.forEach(j => {       
            var row = ingredientsTable.append('tr');
            var q = row.append('td')
            q.text(j['qty'])
                .attr("style", "padding-left: 10px")
                .attr("style", "text-align: center")
            var unit = row.append('td')
            unit.text(j['unit'])
                .attr("style", "padding-left: 10px")
                .attr("style", "text-align: center")
            var ing = row.append('td')
            ing.text(j['ingredient'])
                .attr("style", "padding-left: 10px")
        });

        // Recipe Steps
        steps.forEach(d => {
            var card = recipeSteps.append("div").attr("class", "card")
            var imgs = d['images']
            var table = card.append("table")
            var tr = table.append('tr')
            imgs.forEach(i => {
                var td = tr.append('td')
                var a = td.append('a')
                a.attr("href", i)
                    .attr("target","_blank")
                var image = a.append('img')
                image.attr("src", i)
                    .attr('width', "48%")
                    .attr("style", "padding: 20px")
                    .attr("target", "_blank")
            });
            var step = card.append('div').attr("class", "card-body").attr("style", "font-size: 18px")
            step.text(d['description']).attr("font-size", "large")

            // imgs.forEach(i => {
            //     card.append('img').attr("src", i)
            // })
        });
    });
};