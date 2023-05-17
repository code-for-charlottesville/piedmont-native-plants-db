from rest_framework import permissions

'''
    This file defines permission classes to be used in the API views
'''


class AdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action in ('list', 'retrieve'):
            return True
        else:
            return bool(request.user and request.user.is_staff)

    @staticmethod
    def get_description():
        return '''
        Uses AdminOrReadOnly Permissions: 
            (user.is_staff == True)  => ['__all__']
            (user.is_staff == False) => ['list', 'retrieve']
        '''
