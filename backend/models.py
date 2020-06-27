from server import app
from flask_sqlalchemy import SQLAlchemy

# Modules
db = SQLAlchemy(app)


class Organisation(db.Model):
    __tablename__ = "organisations"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    divisions = db.relationship("Division", backref="organisation")


class Division(db.Model):
    __tablename__ = "divisions"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)
    branches = db.relationship("Branch", backref="division")
    organisation_id = db.Column(db.Integer, db.ForeignKey("organisations.uuid"))


class Branch(db.Model):
    __tablename__ = "branches"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    employees = db.relationship("User", backref="branch")
    division_id = db.Column(db.Integer, db.ForeignKey("divisions.uuid"))


class User(db.Model):
    __tablename__ = "users"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)
    role = db.Column(db.String(256), index=True)
    branch_id = db.Column(db.Integer, db.ForeignKey("branches.uuid"))


def bootstrap_db():
    branch = Branch(name="branch 1")
    user = User(name="user 1", role="staff", branch=branch)
    db.session.add(branch)
    db.session.add(user)
    db.session.commit()
    print(Branch.query.all())
    print(User.query.all())


def reset_db():
    db.drop_all()
    db.create_all()
    #bootstrap_db()


if __name__ == "__main__":
    reset_db()

