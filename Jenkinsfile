pipeline {
  agent any

  environment {
    IMAGE = 'ynoacamino/enrollment_service'
  }

  stages {
    stage('Setup buildx') {
      steps {
        script {
          sh '''
            docker run --privileged --rm tonistiigi/binfmt --install all || true
            docker buildx create --name buildx_builder --use || docker buildx use buildx_builder
            docker buildx inspect --bootstrap
          '''
        }
      }
    }

    stage('Login in registries') {
      steps {
        withCredentials([
          usernamePassword(credentialsId: 'DOCKER_HUB', usernameVariable: 'DOCKER_HUB_USR', passwordVariable: 'DOCKER_HUB_PSW'),
          usernamePassword(credentialsId: 'GITHUB', usernameVariable: 'GHCR_USR', passwordVariable: 'GHCR_PSW')
        ]) {
          sh '''
            echo "$DOCKER_HUB_PSW" | docker login -u "$DOCKER_HUB_USR" --password-stdin
            echo "$GHCR_PSW" | docker login ghcr.io -u "$GHCR_USR" --password-stdin
          '''
        }
      }
    }

    stage('Build and push images') {
      steps {
        script {
          def DOCKER_IMAGE = "docker.io/${env.IMAGE}"
          def GHCR_IMAGE   = "ghcr.io/${env.IMAGE}"

          def DOCKER_IMAGE_BACKEND = "${DOCKER_IMAGE}-backend"
          def GHCR_IMAGE_BACKEND   = "${GHCR_IMAGE}-backend"

          def tag = env.GIT_BRANCH?.replace('refs/tags/', '')
          if (!tag) {
            error("❌ No se pudo detectar el tag. Aborta el build.")
          }
          echo "📦 Tag detectado: ${tag}"

          sh """
            docker buildx build \\
              --platform linux/amd64,linux/arm64 \\
              --provenance=false \\
              -t ${DOCKER_IMAGE_BACKEND}:${tag} \\
              -t ${DOCKER_IMAGE_BACKEND}:latest \\
              -t ${GHCR_IMAGE_BACKEND}:${tag} \\
              -t ${GHCR_IMAGE_BACKEND}:latest \\
              --push ./backend
          """
        }
      }
    }

    stage('Clean docker') {
      steps {
        sh 'docker builder prune -f'
      }
    }
  }
}
