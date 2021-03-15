# Copyright Contributors to the Open Cluster Management project

FROM registry.access.redhat.com/ubi8/nodejs-14:1

# Root needed for yum update, gets reset to 1001 below.
USER root
RUN yum -y remove nodejs-nodemon
RUN yum -y update

ARG VCS_REF
ARG VCS_URL
ARG IMAGE_NAME
ARG IMAGE_DESCRIPTION
ARG IMAGE_DISPLAY_NAME
ARG IMAGE_NAME_ARCH
ARG IMAGE_MAINTAINER
ARG IMAGE_VENDOR
ARG IMAGE_VERSION
ARG IMAGE_DESCRIPTION
ARG IMAGE_SUMMARY
ARG IMAGE_OPENSHIFT_TAGS

LABEL org.label-schema.vendor="Red Hat" \
      org.label-schema.name="$IMAGE_NAME_ARCH" \
      org.label-schema.description="$IMAGE_DESCRIPTION" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.vcs-url=$VCS_URL \
      org.label-schema.license="Red Hat Advanced Cluster Management for Kubernetes EULA" \
      org.label-schema.schema-version="1.0" \
      name="$IMAGE_NAME" \
      maintainer="$IMAGE_MAINTAINER" \
      vendor="$IMAGE_VENDOR" \
      version="$IMAGE_VERSION" \
      release="$VCS_REF" \
      description="$IMAGE_DESCRIPTION" \
      summary="$IMAGE_SUMMARY" \
      io.k8s.display-name="$IMAGE_DISPLAY_NAME" \
      io.k8s.description="$IMAGE_DESCRIPTION" \
      io.openshift.tags="$IMAGE_OPENSHIFT_TAGS"

ENV BABEL_DISABLE_CACHE=1 \
    NODE_ENV=production \
    USER_UID=1001

RUN mkdir -p /opt/app-root/src/grc-ui
RUN mkdir -p /opt/app-root/src/grc-ui/licenses
WORKDIR /opt/app-root/src/grc-ui

COPY . /opt/app-root/src/grc-ui

EXPOSE 3000

USER ${USER_UID}
CMD ["node", "app.js"]
