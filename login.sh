#!/bin/bash
function login {
  curl -X POST -d '{"email":"user@template.com","password":"123456"}' -H "Content-Type: application/json" http://localhost:3003/sessions &
  sleep 0.5
}


for (( count=10; count>0; count-- ))
do
  login
done

