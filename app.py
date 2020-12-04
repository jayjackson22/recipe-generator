from flask import Flask, render_template, redirect, jsonify
from sqlalchemy import create_engine
import getdata


app = Flask(__name__)

# # Use flask_pymongo to set up mongo connection
# connection_string = "postgres:sealab2021@dvgroup1.c0yvlavqskus.us-west-2.rds.amazonaws.com:5432/project2"
# engine = create_engine(f'postgresql://{connection_string}')


@app.route("/")
def index():
    site_data = ['hello world']
    return render_template("index.html", site_data=site_data)


@app.route("/recipes/<recipe_id>")
def recipes(recipe_id):
    recipe_data = getdata.recipes(recipe_id)
    return jsonify(recipe_data)

@app.route("/ingredients")
def ingredients():
    ingredients_data = getdata.ingredients()
    return jsonify(ingredients_data)


@app.route("/recipes")
def recipes_list():
    site_data = getdata.recipe_list()
    return jsonify(site_data)


if __name__ == "__main__":
    app.run(debug=True)
