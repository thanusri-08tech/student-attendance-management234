from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Wraps DRF's default exception handler so every error response returned
    by the API has a consistent, predictable JSON shape:

        { "error": true, "detail": "..." }              -- generic errors
        { "error": true, "detail": {"field": [...]} }    -- validation errors

    This keeps the frontend's error handling simple and avoids ever leaking
    raw tracebacks to the client.
    """
    response = exception_handler(exc, context)

    if response is not None:
        response.data = {
            'error': True,
            'detail': response.data,
        }
        return response

    # Unhandled exception (e.g. unexpected server error) - never expose
    # internal details to the client.
    return Response(
        {'error': True, 'detail': 'An unexpected server error occurred.'},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )
