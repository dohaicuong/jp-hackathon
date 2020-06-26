from server import app
from flask_sqlalchemy import SQLAlchemy

# Modules
db = SQLAlchemy(app)


class Branch(db.Model):
    __tablename__ = "branches"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    employees = db.relationship("User", backref="branch")


class User(db.Model):
    __tablename__ = "users"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)
    role = db.Column(db.String(256), index=True)
    branch_id = db.Column(db.Integer, db.ForeignKey("branches.uuid"))


def init_db():
    db.create_all()
    branch = Branch(name="branch 1")
    user = User(name="user 1", role="staff", branch=branch)
    db.session.add(branch)
    db.session.add(user)
    db.session.commit()
    print(Branch.query.all())
    print(User.query.all())


if __name__ == "__main__":
    init_db()

