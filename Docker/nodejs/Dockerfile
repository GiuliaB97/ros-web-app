FROM node:latest
ENV WORKINGDIR=/root/app
WORKDIR ${WORKINGDIR}
RUN    mkdir -p ${WORKINGDIR} && chmod 666 ${WORKINGDIR}
COPY   ./app  ${WORKINGDIR}/
RUN    npm install
EXPOSE 7000
CMD nodejs index.js

