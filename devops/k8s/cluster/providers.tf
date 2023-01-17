# CLUSTER

provider "kubernetes" {
  config_path = pathexpand(var.cluster_config_path)
}

provider "kind" {
}

resource "kind_cluster" "default" {
  name            = var.cluster_name
  kubeconfig_path = pathexpand(var.cluster_config_path)
  wait_for_ready  = true

  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"

    node {
      role = "control-plane"

      kubeadm_config_patches = [
        "kind: InitConfiguration\nnodeRegistration:\n  kubeletExtraArgs:\n    node-labels: \"ingress-ready=true\"\n"
      ]

      extra_port_mappings {
        container_port = 80
        host_port      = 80
        listen_address  = "0.0.0.0"
      }

      extra_port_mappings {
        container_port = 443
        host_port      = 443
        listen_address  = "0.0.0.0"
      }
    }

    node {
      role = "worker"
    }

    node {
      role = "worker"
    }
  }
}

# HELM

provider "helm" {
  kubernetes {
    config_path = pathexpand(var.cluster_config_path)
  }
}

resource "helm_release" "ingress_nginx" {
  name       = "ingress-nginx"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = var.ingress_nginx_helm_version

  namespace        = var.ingress_nginx_namespace
  create_namespace = true

  values = [file("nginx_ingress_values.yaml")]

  depends_on = [kind_cluster.default]
}


# NULL

resource "null_resource" "wait_for_ingress_nginx" {
  triggers = {
    key = uuid()
  }

  provisioner "local-exec" {
    command = <<EOF
      printf "\nWaiting for the nginx ingress controller...\n"
      kubectl wait --namespace ${helm_release.ingress_nginx.namespace} \
        --for=condition=ready pod \
        --selector=app.kubernetes.io/component=controller \
        --timeout=90s
    EOF
  }

  depends_on = [helm_release.ingress_nginx]
}
