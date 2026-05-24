from pydantic import BaseModel


class GoogleAuthRequest(BaseModel):
    id_token: str


class UserResponse(BaseModel):
    name: str
    email: str
    picture: str | None = None


class LoginResponse(BaseModel):
    access_token: str
    user: UserResponse
