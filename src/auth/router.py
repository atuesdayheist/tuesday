from fastapi import APIRouter, Depends
from .service import AuthService
from .dependencies import get_auth_service
from .schemas import GoogleAuthRequest, LoginResponse

router = APIRouter()


@router.post("/google", response_model=LoginResponse)
async def google_login(
    payload: GoogleAuthRequest,
    service: AuthService = Depends(get_auth_service),
):
    return await service.google_login(payload.id_token)
