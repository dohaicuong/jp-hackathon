from server import app
from flask_sqlalchemy import SQLAlchemy

# Modules
db = SQLAlchemy(app)


class Organisation(db.Model):
    __tablename__ = "organisations"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    divisions = db.relationship("Division", backref="organisation")

    def __repr__(self):
        return "<Organisation %r>" % self.name


class Division(db.Model):
    __tablename__ = "divisions"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)
    branches = db.relationship("Branch", backref="division")
    organisation_id = db.Column(db.Integer, db.ForeignKey("organisations.uuid"))

    def __repr__(self):
        return "<Division %r>" % self.name


class Branch(db.Model):
    __tablename__ = "branches"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    employees = db.relationship("User", backref="branch")
    division_id = db.Column(db.Integer, db.ForeignKey("divisions.uuid"))

    def __repr__(self):
        return "<Branch %r>" % self.name


class User(db.Model):
    __tablename__ = "users"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True)
    role = db.Column(db.String(256), index=True)
    branch_id = db.Column(db.Integer, db.ForeignKey("branches.uuid"))

    def __repr__(self):
        return "<Employee %r, %r>" % (self.name, self.role)


class Account(db.Model):
    __tablename__ = "accounts"
    uuid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), index=True)
    password = db.Column(db.String(256), index=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.uuid"))
    def __repr__(self):
        return "<Account %r>" % (self.email)


def bootstrap_db():
    org = Organisation(name="FlyHR")
    div = Division(name="Tech", organisation=org)
    branch = Branch(name="Dev", division=div)
    user = User(name="Steven", role="Developer", branch=branch)
    db.session.add(org)
    db.session.add(div)
    db.session.add(branch)
    db.session.add(user)
    db.session.commit()
    print(Organisation.query.all())
    print(Division.query.all())
    print(Branch.query.all())
    print(User.query.all())


def reset_db():
    db.drop_all()
    db.create_all()
    bootstrap_db()


if __name__ == "__main__":
    reset_db()

