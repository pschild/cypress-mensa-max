FROM cypress/included:latest

ADD ./ /e2e
WORKDIR /e2e
ENTRYPOINT ["node", "express.js"]