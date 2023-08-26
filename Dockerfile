FROM python:2.7.18-slim-stretch
WORKDIR /app
RUN pip install -U pip
COPY requirements-docker.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["hyde", "serve"]
