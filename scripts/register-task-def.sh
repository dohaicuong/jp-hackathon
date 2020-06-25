#!/bin/bash

aws ecs register-task-definition --region ap-southeast-2 --cli-input-json file://./ecs-task-definition.json