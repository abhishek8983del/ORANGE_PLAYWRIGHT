FROM mcr.microsoft.com/playwright:v1.62.0-noble

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p /app/reports /app/custom-report /app/allure-results /app/allure-report /app/test-result

ENV CI=true

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

RUN chmod +x /app/docker-entrypoint.sh