from server import app
from flask_sqlalchemy import SQLAlchemy
from utils import encode, generate_token

# Modules
db = SQLAlchemy(app)


class Organisation(db.Model):
    __tablename__ = "organisations"
    uuid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    divisions = db.relationship("Division", backref="organisation")
    admin = db.relationship("Account", backref="organisation") # 1-1 relation

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
    name = db.Column(db.String(256), index=True)
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
    email = db.Column(db.String(256), index=True, unique=True)
    password = db.Column(db.String(256), index=True)
    token = db.Column(db.String(256), index=True)
    organisation_id = db.Column(db.Integer, db.ForeignKey("organisations.uuid"))

    def __repr__(self):
        return "<Account %r>" % (self.email)


class QuestionOption(db.Model):
    __tablename__ = "question_options"
    uuid = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(256), index=True)
    logo = db.Column(db.String(256), index=True)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.uuid"))
    
    def __repr__(self):
        return "<Question Option %r>" % (self.label)


class Question(db.Model):
    __tablename__ = "questions"
    uuid = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(256), index=True)
    is_multiple = db.Column(db.Boolean, index=True)
    is_optional_response = db.Column(db.Boolean, index=True)
    question_options = db.relationship("QuestionOption", backref="question_options")
    notification_questions = db.relationship("NotificationQuestion", backref="notification_questions")

    def __repr__(self):
        return "<Question %r>" % (self.version)
    

class NotificationQuestion(db.Model):
    __tablename__ = "notification_questions"
    uuid = db.Column(db.Integer, primary_key=True)
    notification_id = db.Column(db.Integer, db.ForeignKey("notifications.uuid"))
    frequency = db.Column(db.String(256), index=True)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.uuid"))
    
    def __repr__(self):
        return "<NotificationQuestion %r>" % (self.label)


class Notification(db.Model):
    __tablename__ = "notifications"
    uuid = db.Column(db.Integer, primary_key=True)
    version = db.Column(db.Integer, index=True)
    notification_question_id = db.relationship("NotificationQuestion", backref="notification")

    def __repr__(self):
        return "<Notification version %r>" % (self.version)


class NotificationOption(db.Model):
    __tablename__ = "notification_options"
    uuid = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(256), index=True)
    logo = db.Column(db.String(256), index=True)

    def __repr__(self):
        return "<Question Option %r>" % (self.label)


def bootstrap_db():
    org = Organisation(name="FlyHR")
    div = Division(name="Tech", organisation=org)
    branch = Branch(name="Dev", division=div)
    user = User(name="Steven", role="Developer", branch=branch)
    acc = Account(email="admin@com", password=encode("123"), token=generate_token("admin@com",'123'), organisation=org)
    db.session.add(org)
    db.session.add(div)
    db.session.add(branch)
    db.session.add(user)
    db.session.add(acc)
    db.session.commit()
    print(Organisation.query.all())
    print(Division.query.all())
    print(Branch.query.all())
    print(User.query.all())
    print(Account.query.all())


def reset_db():
    db.drop_all()
    db.create_all()
    bootstrap_db()


if __name__ == "__main__":
    reset_db()

