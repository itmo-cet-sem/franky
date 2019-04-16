#!/bin/bash

docker_stack_yml_file="$(dirname "${BASH_SOURCE[0]}")/../../docker-stack.yml"
services_img_file="$(dirname "${BASH_SOURCE[0]}")/../../services.img"

for img in $(awk '{if ($1 == "image:") print $2;}' < $docker_stack_yml_file); do
	  images="$images $img"
done

docker save -o $services_img_file $images
