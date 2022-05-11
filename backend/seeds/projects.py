from backend.models import db, Project

def seed_projects():
    p1 = Project(title="First Test Project", user_id=1)
    p2 = Project(title="Second Test Project", user_id=1)

    db.session.add_all([p1, p2])
    db.session.commit()

def undo_projects():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE')
    #db.session.commit()
