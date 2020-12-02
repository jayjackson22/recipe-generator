from flask import Flask, render_template, redirect, jsonify
from sqlalchemy import create_engine
from sqlalchemy.sql import select
import pandas as pd
import sqlalchemy as db

# connection_string = "postgres:sealab2021@dvgroup1.c0yvlavqskus.us-west-2.rds.amazonaws.com:5432/project2"
connection_string = 'postgres:Adgjmpt1@postresql.cfwwjixawhdl.us-east-2.rds.amazonaws.com:5432/RecipeGenerator'
engine = db.create_engine(f'postgresql://{connection_string}', echo=True)
connection = engine.connect()
metadata = db.MetaData()

def recipes():
    # Recipes
    table = db.Table('recipe_list', metadata, autoload = True, autoload_with = engine)
    query = db.select(
        [
            table
        ]
    )

    result = connection.execute(query).fetchall()
    recipe_response = []
    for ea in result:
        recipe_response.append(
            {
                "id": ea[0],
                "name": ea[1],
                'description': ea[2],
                'category': ea[3],
                'subcategory': ea[4],
                'prep_time': ea[5],
                'total_time': ea[6],
                'calories': ea[7],
                'hf_id': ea[8],
                'tip': ea[9],
                'image_url': ea[10]
            }
        )

    return recipe_response
    
def ingredients():
    # Ingredients
    table = db.Table('ingredients', metadata, autoload = True, autoload_with = engine)
    query = db.select(
        [
            table
        ]
    )

    

    result = connection.execute(query).fetchall()
    ingredient_response = []

    for ea in result:
        ingredient_response.append(
            {
                "id": ea[0],
                "recipe_id": ea[1],
                'ingredient_id': ea[2],
                'qty': ea[3],
                'unit': ea[4],
                'servings': ea[5]
            }
        )

    return ingredient_response
   
# def routes(selectedCity="Sedona Area"):
#     table = db.Table('routes', metadata, autoload = True, autoload_with=engine)
#     #Query - "table.c.{column_name}" to add specific columns, "where" to filter
#     query = db.select(
#         [
#             table.c.name,
#             table.c.latitude,
#             table.c.longitude,
#             table.c.type,
#             table.c.rating,
#             table.c.stars,
#             table.c.pitches,
#             table.c.imgSqSmall,
#             table.c.url
#         ]).where(table.columns.city == selectedCity)

#     result = connection.execute(query).fetchall()
#     # print(type(dict(result[0])))
#     # print(result)
#     routes_response = []
#     for ea in result:
#         routes_response.append(
#             {
#                 "route": ea[0],
#                 "lat": ea[1],
#                 "lon": ea[2],
#                 "type": ea[3],
#                 "rating": ea[4],
#                 "stars": ea[5],
#                 "pitches": ea[6],
#                 "image_url": ea[7],
#                 "url": ea[8]
#             }
#         )

#     return routes_response
   
   
# def dispensaries(disp_lat=34.1403, disp_lon=-118.3838):
#     table = db.Table('dispensaries', metadata, autoload = True, autoload_with=engine)
#     #Query - "table.c.{column_name}" to add specific columns, "where" to filter
#     upper_lat = disp_lat+1.5
#     lower_lat = disp_lat-1.5
#     upper_lon = disp_lon+1.5
#     lower_lon = disp_lon-1.5
#     query = db.select(
#         [
#             table.c.name,
#             table.c.lat,
#             table.c.lon,
#             table.c.featured_image,
#             table.c.type
#         ]).where(table.columns.lat < upper_lat).where(table.columns.lat > lower_lat).where(table.columns.lon < upper_lon).where(table.columns.lon > lower_lon)
#     result = connection.execute(query).fetchall()
#     # print(type(dict(result[0])))
#     # print(result)
#     routes_response = []
#     for ea in result:
#         routes_response.append(
#             {
#                 "dispensary": ea[0],
#                 "lat": ea[1],
#                 "lon": ea[2],
#                 "image_url": ea[3],
#                 "type": ea[4]
#             }
#         )

#     return routes_response