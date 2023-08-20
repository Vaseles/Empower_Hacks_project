from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

class AuthViewTests(TestCase):
    def setUp(self):
        self.username = 'test_user'
        self.password = 'test_password'
        self.user = User.objects.create_user(username=self.username, 
                                             email= '', 
                                             password=self.password)

    # Sign In
    def test_sign_in_authenticated(self):
        self.client.force_login(self.user)
        response = self.client.get(reverse('base:sign-in'))
        self.assertRedirects(response, reverse('base:index'))

    def test_sign_in_valid_credentials(self):
        response = self.client.post(reverse('base:sign-in'), {'username': self.username, 
                                                              'email': '', 
                                                              'password': self.password})
        self.assertRedirects(response, reverse('base:index'))
    
    def test_sign_in_not_valid_username(self):
        response = self.client.post(reverse('base:sign-in'), {'username': 'some_username', 
                                                              'email': '', 
                                                              'password': 'self.password'})
        self.assertEqual(response.status_code, 200)
        
    def test_sign_in_not_valid_password(self):
        response = self.client.post(reverse('base:sign-in'), {'username': self.username, 
                                                              'email': '', 
                                                              'password': 'some_password'})
        self.assertEqual(response.status_code, 200) 

    # Sign Up
    def test_sign_up_authenticated(self):
        self.client.force_login(self.user)
        response = self.client.get(reverse('base:sign-up'))
        self.assertRedirects(response, reverse('base:index'))

    def test_sign_up_valid_registration(self):
        new_user = 'new_test_user'
        new_password = 'new_test_password'
        response = self.client.post(reverse('base:sign-in'), {'username': new_user,
                                                              'email': '',
                                                              'password': new_password})
        self.assertRedirects(response, reverse('base:index'))
        
    def test_sign_up_not_valid_username(self):
        response = self.client.post(reverse('base:sign-up'), {'username': self.username,
                                                              'email': '',
                                                              'password': self.password})
        self.assertEqual(response.status_code, 200)
        
    #  Sign Out
    def test_sign_out(self):
        self.client.force_login(self.user)
        response = self.client.get(reverse('base:sign-out'))
        self.assertRedirects(response, reverse('base:sign-in'))