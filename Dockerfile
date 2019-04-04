
# **
# * Build fronted
# **
FROM node:10 as react

# RUN useradd -r runner
# USER runner

WORKDIR /home/runner/franky/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# **
# * Caching pip deps
# **
FROM python:3.6-alpine as base
FROM base as builder
RUN mkdir /install
WORKDIR /install
COPY ./backend/requirements.txt /requirements.txt
RUN pip install --install-option="--prefix=/install" -r /requirements.txt

# **
# * Build python server
# **
FROM base

RUN adduser -S runner
USER runner

COPY --from=builder /install /usr/local
COPY ./backend /home/runner/franky/backend
COPY --from=react /home/runner/franky/frontend/build/ /var/www/franky/
WORKDIR /home/runner/franky/backend
EXPOSE 5000
CMD ["python", "franky/server.py"]
