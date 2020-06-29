import random, hashlib, jwt


def generate_token(email, password):
    s = email + password + str(random.random())
    return hashlib.sha256(s.encode()).hexdigest()


def encode(password):
    secret = "bi mat khong cho ai biet"
    return jwt.encode({"some": password}, secret, algorithm="HS256")


def decode(password):
    secret = "bi mat khong cho ai biet"
    return jwt.decode(password, secret, algorithms=["HS256"])["some"]