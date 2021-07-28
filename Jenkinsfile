pipeline {
    agent {
        docker {
            image 'node:latest'
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install; npm install @angular/cli'
            }
        }
       stage('Build') {
            steps {
                sh './node_modules/.bin/ng build --prod'
            }
        }
    }
}
