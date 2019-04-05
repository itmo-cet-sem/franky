#!/bin/bash

docker_stack_yml="$(dirname "${BASH_SOURCE[0]}")/../../docker-stack.yml"

for img in $(cat $docker_stack_yml | awk '{if ($1 == "image:") print $2;}'); do
	  images="$images $img"
done

docker save -o services.img $images
