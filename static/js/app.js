d3.json(`/recipes`).then(d=> {
    var tbody = d3.select("tbody");
    var dd = d3.selectAll(".dropdown-menu")
    var ddName = d3.select("#dropdownMenuButton")
    ddName.text("Recipe")

    var recipes = []
    d.forEach(d => {
        recipes.push(
            {
                name: d['name'],
                id: d['id']
            }
        )
    });

    recipes.forEach(function(d) {
        // Populate table
        var row = tbody.append("tr");
        var th = row.append("th")
        th.text(d['id'])
        var th = row.append("th")
        var a = th.append('a')
        a.text(d['name']).attr("_id",`${d['id']}`).on('click', getRecipe)
        a.attr("href", `/viewRecipe?${d['id']}`)
        // a.attr("target", "_blank")
        
        // Populate Dropdown
        var itemDiv = dd.append("div")
        var itemA = itemDiv.append("a")
        itemA.attr("href", `/viewRecipe?${d['id']}`)
        // itemA.attr("target", "_blank")
        var item = itemA.attr("class", "dropdown-item")
        item.text(d['name']).attr("_id",`${d['id']}`).on('click', getRecipe)

    });

});

function getRecipe(d) {
    var recipeId = d.target.attributes[3].value;
};