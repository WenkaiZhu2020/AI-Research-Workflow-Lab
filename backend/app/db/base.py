from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


from app.models.run_record import RunRecord  # noqa: E402,F401
