pipeline {
    environment {
        frontend = 'his_frontend-image' // Specify your frontend Docker image name/tag
        docker_image = ''
    }
    
    agent any

    stages {
        
        stage('Stage 1: Git Clone') {
            steps {
                echo 'Cloning the Git repository'
                git branch: 'main', url: 'https://github.com/MnCSSJ4x/his-registration-desk-frontend.git', credentialsId: 'github-credentials'
            }
        }
        
        stage('Stage 3: Build frontend Docker image') {
            steps {
                echo 'Building frontend Docker image'
                sh "docker build -t karanjit708/${frontend} ."
            }
        }
        
        stage('Stage 4: Push frontend Docker image to DockerHub') {
            steps {
                echo 'Pushing frontend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerCred') {
                        sh 'docker push karanjit708/${frontend}'
                    }
                }
            }
        }
        stage('Stage 5: Clean docker images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
    }
}