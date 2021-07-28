pipeline {
    agent {
        docker {
            image 'node:latest'
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install; npm install -g @angular/cli'
            }
        }
       stage('Build') {
            steps {
                sh 'ng build --prod'
            }
        }
    }
}
