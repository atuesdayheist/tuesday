from fastapi import Depends

from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db
from .service import AuthService
from .repository import UserRepository


def get_user_repo(db: AsyncSession = Depends(get_db)):
    return UserRepository(db)


def get_auth_service(db=Depends(get_db)):
    user_repo = UserRepository(db)
    return AuthService(user_repo)
