//this build push the latest from master to the PROD env
//Build to prod ONLY trigger manually
pipeline {
    agent any

    environment {
        DEPLOY_COMMAND="ssh -o StrictHostKeyChecking=no -p 25782 jenkins-agent@sso.openexl.com echo PIGGYS_FE_VERSION=${GIT_COMMIT} > /data/other-projects/piggys-wallet/.env && docker-compose -f /data/other-projects/piggys-wallet/piggys-frontend.yaml up -d"
        DOCKERFILE="Dockerfile"
        SHORT_COMMIT = "${GIT_COMMIT[0..7]}"
        SSH_AGENT="jenkins_agent_prod"
    }
    stages {

        stage('Build image and push to docker hub') {
            steps {
                script {
                     nodejs(nodeJSInstallationName: 'nodejs18') {
                         sh 'corepack enable'
                         sh 'corepack prepare pnpm@latest-8 --activate'
                         sh 'pnpm install'
                         sh 'pnpm build:prod'
                     }
                     echo "Build number ${GIT_COMMIT}"
                     docker.withRegistry('https://registry.openexl.com/repository/d1', 'jenkins_docker') {
                     def app = docker.build("piggys-wallet-frontend:${GIT_COMMIT}", "--build-arg PIGGYS_BUILD_SHA=${SHORT_COMMIT} -f ${DOCKERFILE} .").push()
                  }
                }
            }
        }
        stage('Update deployment') {
            steps {
                script {
                    echo "Deploy command: ${GIT_COMMIT} ${DEPLOY_COMMAND}"
                    sshagent (credentials: ["${SSH_AGENT}"]) {
                       sh '${DEPLOY_COMMAND}'
                   }

                }

            }
        }
    }
}
