# Integrating with Kubernetes

[Kubernetes](https://kubernetes.io) is an open-source system for automating deployment, scaling, and management of containerized applications

**tests/workflow.yml**

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://${{env.host}}
          method: GET
          check:
            status: /^20/
```

Create a ConfigMap:

```
kubectl create configmap stepci-config --from-file=tests/workflow.yml
```

Create a Pod:

**pod.yml**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: stepci
spec:
  containers:
  - name: stepci
    image: ghcr.io/stepci/stepci
    args: ["/tmp/workflow.yml"]
    volumeMounts:
    - name: stepci-volume
      mountPath: /tmp
  volumes:
    - name: stepci-volume
      configMap:
        name: stepci-config
        items:
          - key: workflow.yml
            path: workflow.yml
  restartPolicy: Never
```

```
kubectl apply -f pod.yml
```
