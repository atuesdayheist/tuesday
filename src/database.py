<<<<<<< Updated upstream:api/db/postgres.py
import os
=======
from sqlalchemy.orm import DeclarativeBase, sessionmaker
>>>>>>> Stashed changes:src/database.py
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

<<<<<<< Updated upstream:api/db/postgres.py
DATABASE_URL = os.getenv("DATABASE_URL")
=======
from src.config import settings


class Base(DeclarativeBase):
    pass


database_url = settings.DATABASE_URL

if database_url.startswith("postgresql://"):
    database_url = database_url.replace(
        "postgresql://",
        "postgresql+asyncpg://",
        1,
    )
>>>>>>> Stashed changes:src/database.py

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
