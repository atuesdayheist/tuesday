from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import select

from api.auth.google import verify_google_id_token
from api.auth.jwt import create_access_token
from api.db.postgres import get_db
from api.db.models import User


router = APIRouter()


class GoogleAuthRequest(BaseModel):
    id_token: str


@router.post("/google")
async def google_login(
    payload: GoogleAuthRequest,
    db: Session = Depends(get_db),
):
    user_data = verify_google_id_token(payload.id_token)

    if not user_data:
        raise HTTPException(
            status_code=401,
            detail="Invalid Google token",
        )

    if not user_data.get("email_verified"):
        raise HTTPException(
            status_code=401,
            detail="Google email not verified",
        )

    email = user_data["email"]
    google_sub = user_data["sub"]

    result = await db.execute(select(User).where(User.sub == google_sub))
    user = result.scalar_one_or_none()

    if not user:
        user = User(
            email=email,
            sub=google_sub,
            name=user_data.get("name"),
            picture=user_data.get("picture"),
        )

        db.add(user)
        await db.commit()
        await db.refresh(user)

    access_token = create_access_token(
        {
            "sub": str(user.id),
            "email": user.email,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "picture": user.picture,
        },
    }
