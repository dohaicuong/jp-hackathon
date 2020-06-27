from server import app
from models import reset_db
from schema import schema
from flask_graphql import GraphQLView


@app.route("/")
def index():
    return "<p>FlyHR API</p>"


@app.route("/reset")
def reset():
    if app.debug == False:
        return "<p>This feature is for developer use only</p>"
    reset_db()
    return "<p>DB reset!</p>"


app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql", schema=schema, graphiql=True  # for having the GraphiQL interface
    ),
)
