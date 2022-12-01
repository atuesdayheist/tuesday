Authentication
- Cookie Token and isAuth state are independent of one another. Perhaps try looking at a different implementation of it?
- Display multiple registration/login errors at once (currently it only displays the first error)
- Authenticate and redirect user after successful registration (should use the same logic as the login success)