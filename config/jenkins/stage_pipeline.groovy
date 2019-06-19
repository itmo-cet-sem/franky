#!groovy
properties([disableConcurrentBuilds()])

pipeline {
    agent { 
        label 'master'
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
        timestamps()
    }
    stages {
        stage('Preparation') {
            steps {
                git( url: 'https://github.com/itmo-cet-sem/franky.git',
                    branch: 'staging')
                sh 'cp config/nginx/nginx.prod.conf config/nginx/nginx.conf'
                sh 'chmod +x config/bin/save-docker-images.sh'
            }
        }
        stage('Build') {
            steps {
                sh 'cd /var/lib/jenkins/workspace/franky'
                sh 'docker-compose build'
                sh './config/bin/save-docker-images.sh'
            }
        }
        stage('Copy') {
            steps {
                sh 'scp docker-stack.yml runner@franky:~/franky-deploy'
                sh 'scp services.img runner@franky:~/franky-deploy'
            }
        }
        stage('Deploy') {
            steps {
                sh '$(ssh runner@franky \'docker service rm $(docker service ls -q) 2>/dev/null\' ) || echo \'no sevices found\''
                sh '$(ssh runner@franky \'docker image rm $(docker image ls -q) 2>/dev/null\' ) || echo \'no images found\''
                sh 'ssh runner@franky \'cd ~/franky-deploy && docker load -i services.img\''
                sh 'ssh runner@franky  \'cd ~/franky-deploy &&  docker stack deploy --compose-file docker-stack.yml franky\''
            }
        }
    }
}