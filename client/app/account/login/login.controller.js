'use strict';

class LoginController {
  constructor(Auth, $state,$location) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$location=$location;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(
          () => {
          // Logged in, redirect to home
          this.$state.go('main');


        }

        )
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('newFinCopenApp')
  .controller('LoginController', LoginController);
