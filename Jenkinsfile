// List of microservices
def microservices = [
    'Login',
    'CompanyService',
    'AdminService',
]

pipeline {
    agent any
    environment {
        APP_NAME = 'career-forge'
        PUSH_TO_DOCKER_HUB = 'true'
        DOCKER_COMPOSE_CONFIG = 'default'
        DOCKER_IMAGE_PREFIX = 'gsamrit/career-forge'
    }
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Clean existing directory and clone the repository
                    sh 'rm -rf CarrerForge' // Remove existing directory
                    sh 'git clone https://github.com/gunjansamrit/CarrerForge.git'
                }
            }
        }

        stage('Run Tests (Backend)') {
            steps {
                script {
                    // Check if directories exist and run tests for each microservice
                    for (microservice in microservices) {
                        def microserviceDir = "CarrerForge/${microservice}"
                        if (fileExists(microserviceDir)) {
                            dir(microserviceDir) {
                                echo "Running tests for ${microservice}..."
                                // Add test commands, e.g., sh 'npm test' or './run-tests.sh'
                            }
                        } else {
                            echo "Directory for ${microservice} not found. Skipping tests for this microservice."
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Dynamically build Docker images for each microservice
                    for (microservice in microservices) {
                        def imageTag = microservice.toLowerCase()
                        def microserviceDir = "CarrerForge/${microservice}"
                        if (fileExists(microserviceDir)) {
                            sh "docker build -t ${imageTag} ${microserviceDir}"
                        } else {
                            echo "Skipping Docker build for ${microservice} as the directory is missing."
                        }
                    }

                    // Build frontend Docker image
                    if (fileExists('CarrerForge/career-forge')) {
                        sh 'docker build -t frontend CarrerForge/career-forge'
                    } else {
                        echo "Frontend directory not found. Skipping frontend Docker build."
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    if (env.PUSH_TO_DOCKER_HUB == 'true') {
                        // Secure login to Docker Hub using Jenkins credentials
                        withCredentials([usernamePassword(credentialsId: 'DockerCredentialId', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            sh """
                                echo ${DOCKER_PASSWORD} | docker login --username ${DOCKER_USERNAME} --password-stdin
                            """
                        }

                        // Push images for each microservice to Docker Hub
                        for (microservice in microservices) {
                            def imageTag = microservice.toLowerCase()
                            sh """
                                docker tag ${imageTag} ${DOCKER_IMAGE_PREFIX}-${imageTag}:latest
                                docker push ${DOCKER_IMAGE_PREFIX}-${imageTag}:latest
                            """
                        }

                        // Push frontend image
                        sh """
                            docker tag frontend ${DOCKER_IMAGE_PREFIX}-frontend:latest
                            docker push ${DOCKER_IMAGE_PREFIX}-frontend:latest
                        """
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh 'docker-compose -f docker-compose.yaml down'
                    sh '''
                        docker rm -f login-backend || true
                        docker rm -f login-frontend || true
                        docker rm -f company-service || true
                        docker rm -f admin-service || true
                        docker rm -f elastic || true
                        docker rm -f kibana || true
                        docker rm -f logstash || true
                    '''
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Start all services using Docker Compose
                   sh 'docker-compose -f CarrerForge/docker-compose.yaml down'

                }
            }
        }
    }
}
